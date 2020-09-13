var jwt = require('express-jwt');

module.exports = (app) => {
 
  var auth = jwt({
      secret: 'MY_SECRET',
      algorithms: ['HS256'],
      userProperty: 'payload'
    });
  
    const register = require('../Controllers/register.controller');
   
    // Create a new user
    app.post('/register', register.create);
    
    //login user
    app.post('/login',  register.login); 

    //email verification 
    app.post('/verify/:token', register.verify);
    // app.post('/resend', register.resendTokenPost);
 
    
}