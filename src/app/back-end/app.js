const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport');
const port = process.env.PORT||8080;
const dotenv = require('dotenv')
dotenv.config();
const stripe = require('stripe')('sk_test_51HMz6DEHyKoO1QQOxXWohPATmy4xVaWUwnbCoCGTXqBU6NhW2TK8cDcoOf4ENaXHbQUK7C9LBo70rvjcpR46LAWH00j8xY1MIJ');

const app = express();
//Cors for cross origin policy

app.use(cors());


//connection to database
app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true }, (error)=> {
    const connectionStatus = !error ? 'Success': 'Error Connecting to database';
    console.log(connectionStatus);
});

// passport and models
// require('./app/Models/register.model');
require('./app/Config/passport');
//initializing passport 
app.use(passport.initialize());
// app.use('/app', routesApi);

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

mongoose.set('useCreateIndex', true);
//routes
app.get('/', (req, res) => {
    res.json({"message": "welcome to bridal advisor"});
});


require('./app/Routes/register.routes')(app);
require('./app/Routes/profile.routes')(app);
require('./app/Routes/listing.routes')(app);
require('./app/Routes/gallery.routes')(app);
require('./app/Routes/review.routes')(app);
require('./app/Routes/listingLogo.routes')(app);
//error handling

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401);
      res.json({"message" : err.name + ": " + err.message});
    }
  });


//listen



app.listen(port, () => {
    console.log("Server is listening on port "+port);
});
