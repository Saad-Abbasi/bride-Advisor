module.exports = (app) => {
    const login = require('../Controllers/login.controller');
// Retrieve a single user with userId
    app.post('/login', login.findOne);

    
}