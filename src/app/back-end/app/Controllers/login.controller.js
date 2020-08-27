const login = require('../Models/register.model');
// const jwt = require('jsonwebtoken');

exports.findOne = (req, res) => {
    
    var email = req.body.email;
    var password = req.body.password;
    console.log(email)
    console.log(password)
    
    login.findOne({email:email,password:password})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + email
            });            
        }else{
            // let payload = {subject:user._id}
            // let token = jwt.sign(payload,'secretKey')
            //  res.status(200).send({token});
            res.status(200).send({message:"Succefully Login"})
        }
         
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with object " + email
            });                
        }
        return res.status(500).send({
            message: "Error retrieving User with id " + email
        });
    });

        


};