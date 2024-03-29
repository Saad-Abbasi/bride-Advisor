const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const multer = require('multer')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport');
const port = process.env.PORT||8080;
const dotenv = require('dotenv')
dotenv.config();


const app = express();
//Cors for cross origin policy do we need path require ?yes

app.use(cors());


//connection to database
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/', express.static(path.join(__dirname, 'angular')));

//are you using "/" somewhere else no i do not ok
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

mongoose.set('useCreateIndex', true );
mongoose.set('useFindAndModify', false); 
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
require('./app/Routes/payment.routes')(app);

// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, 'angular', 'index.html')); // it  is working on my browser ? amazing
// });
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
