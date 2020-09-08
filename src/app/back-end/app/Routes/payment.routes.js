module.exports = (app) => {
    const payment = require('../Controllers/payment.controller');
// Retrieve a single user with userId
    app.post('/payment', payment.create );

    
}