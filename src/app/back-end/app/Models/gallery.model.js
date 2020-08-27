const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema({
     
    title:String,
    description:String,
    image:String
});

module.exports = mongoose.model('gallery', gallerySchema);