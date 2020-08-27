const mongoose = require('mongoose');

const listingSchema = mongoose.Schema({
    //<---Business Details-->
    profileImage:String,
    listingType:String,
    business:String,
    tradingName:String,
    email:String,
    phone:String,
    website:String,
    address:String,
    
    //<---Sub Categories-->
    fullPlaning:Boolean,
    partPlaning:Boolean,
    coordinator:Boolean,
    //<---Description-->
    tagLine:String,
    description:String,
    //<---Social links-->
    fLink:String,
    tLink:String,
    gLink:String,
    iLink:String,
    pLink:String,
    yVideoLink:String,//<---Youtube Feture video link
    vVideoLink:String,//<---Vimeo Feture video link
    vatNumber:String,
    category:String,
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"logo"
        
    }],
    logo:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"logo"
        
    }],
    gallery:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"gallery"
        
    }]
});

module.exports = mongoose.model('listing', listingSchema);