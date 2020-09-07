
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
    user.ac_Type = req.body.ac_Type;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.secretToken = secretToken;
 

    // Save user in the database

    // user.save(function(err) {
    //   var token;
    //   token = user.generateJwt();
    //   res.status(200);
    //   res.json({
    //     "token" : token
    //   });
    // });

    const html = `Hi There,
                  <br>
                  Thank you for registering 
                  <br><br>
                  please click on the following link to verify the email 
                  <a href="http://localhost:8080/verify/${secretToken}>http://localhost:8080/verify/${secretToken}</a>
                  <br><br>
                  Have A Blessed Day`;
    
    await mailer.sendMail('brideAdvisor.com',req.body.email,'please verify your Eamil',html)

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
    res.send("Success! Thank you for verification you may login");
} catch(error){
  next(error)
}
  
   
  };
 



