const mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({

    ac_Type:{type:String},
    firstName:{type:String},
    lastName:{type:String},
    email:{type:String,unique:true,required:true},
    hash: String,
    salt: String,
    listing:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"listing"
      
  }]

    // password:{type:String,required:true}

});

///generating Salt
userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  };

  //checking pswd

  userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
  };

  //Jwt token
  userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
      _id: this._id,
      email: this.email,
      firstName: this.firstName,
      lastName:this.lastName,
      exp: parseInt(expiry.getTime() / 1000),
    }, 'MY_SECRET'); // need to modify later
  };
//   var User = mongoose.model('User',userSchema);
// module.exports = {User};
module.exports = mongoose.model('User', userSchema);