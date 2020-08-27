
var passport = require('passport');
var mongoose = require('mongoose');
const User = require('../Models/register.model');
var jwt = require('express-jwt');
// Create and Save a new User
exports.create = (req, res) => {
    
    if(!req.body.email||!req.body.password) {
        return res.status(400).send({
            message: "Email And Password cannont be empty"
        });
    }
 

    // Create a User

    const user = new User();
    user.ac_Type = req.body.ac_Type;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    // const user = new User({
    //     ac_Type:req.body.ac_Type,
    //     firstName:req.body.firstName,
    //     lastName:req.body.lastName,
    //     email:req.body.email,
    //     password: req.body.password
    // });

    // Save user in the database
    user.save(function(err) {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
          "token" : token
        });
      });
    // console.log(user)
    // user.save()
    // .then(data => {
    //     // let payload = {subject:data._id}
    //     // let token = jwt.sign('payload','secretKey')
    //     res.send(data);
    // }).catch(err => {
    //     res.status(500).send({
    //         message: err.message || "Some error occurred while creating the User."
    //     });
    // });

};
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

  function verifyToken(req,res,next){
    if(!req.headers.authorization){
      return res.status(401).send("Unathorized request")
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token ==='null') {
      return res.status(401).send("Unathorized request")
    }
    let payload = jwt.verify(token,process.env.SECRET)
    if(!payload){
      return res.status(401).send("Unathorized request")
      req.userId = payload.subject
      next()
    }
  }

var auth = jwt({
  secret: 'process.env.SECRET',
  algorithms: ['HS256'],
  userProperty: 'payload'
});

// Retrieve and return all users from the database.
// exports.findAll = (req, res) => {

//     User.find()
//     .then(users => {
//         res.send(users);
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while retrieving Users."
//         });
//     });
// };

// Find a single User with a userid
// exports.findOne = (req, res) => {
   
//     User.findById(req.params.userId)
//     .then(user => {
//         if(!user) {
//             return res.status(404).send({
//                 message: "User not found with id " + req.params.userId
//             });            
//         }
//         res.send(user);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "User not found with id " + req.params.userId
//             });                
//         }
//         return res.status(500).send({
//             message: "Error retrieving User with id " + req.params.userId
//         });
//     });

// };

// // Update a note identified by the noteId in the request
// exports.update = (req, res) => {
//     if(!req.body.username||!req.body.password) {
//         return res.status(400).send({
//             message: "Username and password cannot be empty"
//         });
//     }

//     // Find note and update it with the request body
//     User.findByIdAndUpdate(req.params.userId, {
//         username: req.body.username ,
//         password: req.body.password
//     }, {new: true})
//     .then(user => {
//         if(!user) {
//             return res.status(404).send({
//                 message: "user not found with id " + req.params.userId
//             });
//         }
//         res.send(user);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "user not found with id " + req.params.userId
//             });                
//         }
//         return res.status(500).send({
//             message: "Error updating user with id " + req.params.userId
//         });
//     });

// };

// // Delete a User with the specified userId in the request
// exports.delete = (req, res) => {
//     User.findByIdAndRemove(req.params.userId)
//     .then(user => {
//         if(!user) {
//             return res.status(404).send({
//                 message: "User not found with id " + req.params.userId
//             });
//         }
//         res.send({message: "User deleted successfully!"});
//     }).catch(err => {
//         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
//             return res.status(404).send({
//                 message: "User not found with id " + req.params.userId
//             });                
//         }
//         return res.status(500).send({
//             message: "Could not delete User with id " + req.params.userId
//         });
//     });

// };