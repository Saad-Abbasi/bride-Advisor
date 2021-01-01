var jwt = require('express-jwt');

module.exports = (app) => {
 
  var auth = jwt({
      secret: 'MY_SECRET',
      algorithms: ['HS256'],
      userProperty: 'payload'
    });
  
    const register = require('../Controllers/register.controller');

   //To do ==>>> Change 'register' to 'user'  <====>
    // Create a new user
    app.post('/register', register.create);

    //Get All admins 
    app.get('/users/admin',register.findAdmins)
    //Delete user 
    app.delete('/users/admin/delete/:userId',register.deleteAdmin)
    //login user
    app.post('/login',  register.login); 

    //email verification 
    app.get('/verify/:token', register.verify);
   
    //Forgot password
    app.post('/pass/forgot', register.reset);
    //update new password 
    app.post('/pass/update', register.passUpdate);
 
}