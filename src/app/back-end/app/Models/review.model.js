const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
     
    name:String,
    description:String,
    date:Date,
    rating:Number
    // response:String
});

module.exports = mongoose.model('review', reviewSchema);