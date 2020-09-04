const Review = require('../Models/review.model');
const Listing = require('../Models/listing.model');
const mongoose = require('mongoose')

exports.create = async  (req, res)=> {
 console.log('listing id ', req.params.listingId)
    
    const listing = await Listing.findById(req.params.listingId);
    // Save review,date and description 
    console.log(req.body);
    
    const review =  new Review({
        _id:mongoose.Types.ObjectId(),
        name:req.body.name,
        description:req.body.description,
        rating:req.body.rating,
        date:new Date()
    });
   
    
    
    // Save Profile/listing 
    console.log(review)
    await review.save();  
    
    await listing.reviews.push(review._id);
    await listing.save().then(result=>{
       return res.send(result);
        
    }).catch(err=>{
        return res.sendStatus(500).send({
            message:err.message|| "some error in reviews"
        });
        
    })
   
          

};
//Using listing id to get all reviews for particular listing 
exports.findOne = (req, res) => {
    Listing.findById(req.params.listingId).populate('reviews')
    .then(reviews => {
        if(!reviews) {
            return res.status(404).send({
                message: "Review not found with id " + req.params.listingId
            });            
        }
        // console.log(reviews)
        // res.send(reviews);
        // console.log(reviews.reviews)
        return res.send(reviews.reviews)
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "reveiew not found with id " + req.params.listingId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving review with id " + req.params.listingId
        });
    });

};
// //Delete gllery image by id

// exports.delete = (req, res) => {
//     Gallery.findByIdAndDelete(req.params.galleryId)
//     .then(gallery => {
//         if(!gallery) {
//             return res.status(404).send({
//                 message: "Gallery  not found with id " + req.params.galleryId
//             });
//         }
//         res.send({message: "Gallery image deleted successfully!"});
//     }).catch(err => {
//         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
//             return res.status(404).send({
//                 message: "Gallery not found with id " + req.params.galleryId
//             });                
//         }
//         return res.status(500).send({
//             message: "Could not delete gallery with id " + req.params.galleryId
//         });
//     });
    // };