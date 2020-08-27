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
    
    // // Retrieve all users
    // app.post('/login', auth, (req,res)=>{
    //     res.send("succesfully accessed");
    // });
    app.post('/login',  register.login);
 
    // // Retrieve a single Note with noteId
    // app.get('/users/:userId', users.findOne);

    // // Update a user with userId
    // app.put('/users/:userId', users.update);

    // // Delete a user with userId
    // app.delete('/user/:userId', users.delete);
}