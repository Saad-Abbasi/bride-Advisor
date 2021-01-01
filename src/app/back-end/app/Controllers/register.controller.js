
var passport = require('passport');
var mongoose = require('mongoose');
const User = require('../Models/register.model');
var jwt = require('express-jwt');
const randomstring = require('randomstring');
const { nextTick } = require('process');
const mailer = require('../Config/mailer')
// Create and Save a new User
exports.create =  (req, res) => {
    
    if(!req.body.email||!req.body.password) {
        return res.status(400).send({
            message: "Email And Password cannont be empty"
        });
    }
  const email = req.body.email;
  console.log('email is',email)

 User.findOne({ email:email },async(err,userExist)=>{
  console.log('Checking user exists or not')
  if (userExist) return res.status(400).send({ msg: 'The email address you have entered is already associated with another account.' });
  
  console.log("creatign user")

    const secretToken = randomstring.generate();

    const user = new User();
    user.ac_Type = req.body.acType;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.secretToken = secretToken;//for verification
    await user.save();

   //Sending Email Template 
   
    host=req.get('host');
    link=`http://brideadviser-env.eba-qm32eea7.us-east-2.elasticbeanstalk.com/verify/${secretToken}`;

    const html = "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
    
    await mailer.sendMail('support@bride-advisor.com',req.body.email,'please verify your Eamil',html)

    return res.status(200).send({
      message:"user created and verification email sent to user "
    })
 })
    
}

//login 

module.exports.login = function(req, res) {

    passport.authenticate('local', function(err, user, info){
      var token;
  
      // If Passport throws/catches an error
      if (err) {
        res.status(404).json(err);
        return;
      }
  
      // If a user is found
      if(user){
        token = user.generateJwt();
        res.status(200);
        res.json({
          "token" : token
        });
      } else {
        // If user is not found
        res.status(401).json(info);
      }
    })(req, res);
  
  };
  //Email Verification
 module.exports.verify = async function(req, res) {
    
   
try{
    const secretToken = req.params.token;
    if (!secretToken) {
      console.log('Secret token not found');
      return res.status(404).send({ message: "Token not found" })
    }
    const user = await User.findOne({ 'secretToken': secretToken })
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }
    user.isVerified = true;
    user.secretToken = "";

    await user.save();
    res.send(`Success! Thank you for verification you may login <br><br><a href="http://bride-advisors.s3-website.us-east-2.amazonaws.com/signin">Click here to Login</a> `);
    
} catch(error){
  next(error)
}
  
};

//password reset

module.exports.reset = async function(req, res) {
    
   
  try{
      const email = req.body.email;
      if (!email) {
        console.log('Email not found');
        return res.status(404).send({ message: "Email not found" })
      }
      const user = await User.findOne({ 'email': email })
      if (!user) {
        res.status(404).send({ message: "User not found" });
        return;
      }

      const  resetToken = randomstring.generate();
      // saving password
      user.setPassword(resetToken);
      await user.save();
      link=`http://brideadviser-env.eba-qm32eea7.us-east-2.elasticbeanstalk.com/reset/${resetToken}`;

      const html = `Hello,<br> Your password is succfully reset.<br><br> New password is ${resetToken} <br><br> You can change password from your dashboard <br><br>Thanks `
      
      await mailer.sendMail('support@bride-advisor.com',req.body.email,'Password reset sucessfully',html)
      return res.send("Reset password sent");
      
  } catch(error){
    next(error)
  }
    
     
    };
//updating Password

module.exports.passUpdate = async function(req, res) {
    
   
  try{
      const email = req.body.email;
      if (!email) {
        console.log('Email not found');
        return res.status(404).send({ message: "User Email not found" })
      }
      const user = await User.findOne({ 'email': email })
      if (!user) {
        res.status(404).send({ message: "User not found" });
        return;
      }

      
      // saving password
      user.setPassword(req.body.password);
      await user.save();
      

      const html = "Your password is successfully changed"
      
      await mailer.sendMail('support@bride-advisor.com',req.body.email,'Password changed',html)
      return res.send(" password changed");
      
  } catch(error){
    next(error)
  }
    
     
  };


//<==================Get Admins====================>
module.exports.findAdmins = function(req, res)  {
  
  User.find({ac_Type: 'admin'},'email firstName lastName _id')
  .then(admins => {
      res.send(admins)
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving Admins."
      });
  });
};

// <===============Delete Admins=================>

exports.deleteAdmin = (req, res) => {
  console.log('Recived user id',req.params.userId)
  User.findByIdAndRemove(req.params.userId)
  .then(user => {
      if(!user) {
          return res.status(404).send({
              message: "User  not found with id " + req.params.userId
          });
      }
      res.send({message: "User deleted successfully!",
                name :user.firstName});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "User not found with id " + req.params.userId
          });                
      }
      return res.status(500).send({
          message: "Could not delete user with id " + req.params.userId
      });
  });

};