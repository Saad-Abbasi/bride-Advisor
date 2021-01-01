module.exports = (app) => {
    var jwt = require('express-jwt');
    var auth = jwt({
        secret: 'MY_SECRET',
        algorithms: ['HS256'],
        userProperty: 'payload'
      });
    const ctrlProfile = require('../Controllers/profile.controller');
// Retrieve a single user with userId

app.get('/profile', auth, ctrlProfile.profileRead);



    
}