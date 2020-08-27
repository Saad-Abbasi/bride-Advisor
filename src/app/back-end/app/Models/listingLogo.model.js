const mongoose = require('mongoose');

const logoSchema = mongoose.Schema({
     
    title:String,
    description:String,
    image:String
});

module.exports = mongoose.model('logo', logoSchema);