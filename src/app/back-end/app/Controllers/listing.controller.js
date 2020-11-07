const Listing = require('../Models/listing.model');
const User = require('../Models/register.model');
const mongoose = require('mongoose');
const multer = require('multer')
// const jwt = require('jsonwebtoken');


// Create and Save a new listing
exports.create = async  (req, res)=> {
    // if (!req.body.duration) {
    //     return res.status(400).send({
    //         message: " content can not be empty"
    //     });
    // }
   console.log(req.file)
    const user = await User.findOne({ _id: req.params.userId });
    // Create a listing
    
    console.log(req.body);
    const listing =  new Listing({
        _id:mongoose.Types.ObjectId(),
       listingType:req.body.listingType,
       business:req.body.business,
       tradingName:req.body.tradingName,
       email:req.body.email,
       phone:req.body.phone,
       website:req.body.website,
       address:req.body.address,
       fullPlaning:req.body.fullPlaning,
       partPlaning:req.body.partPlaning,
       coordinator:req.body.coordinator,
       tagline:req.body.tagline,
       description:req.body.description,
       fLink:req.body.fLink,
       tLink:req.body.tLink,
       gLink:req.body.gLink,
       iLink:req.body.iLink,
       pLink:req.body.pLink,
       yVideoLink:req.body.yVideoLink,
       vVideoLink:req.body.vVideoLink,
       vatNumber:req.body.vatNumber,
       category:req.body.category,
    });
    //img
    if(req.file !== undefined){
        listing.profileImage = req.protocol+'://'+ req.get('Host')+'/uploads'+'/'+req.file.filename;
        console.log(listing.profileImage)
    }
    // Display uploaded image for user validation
    
    // Save Profile/listing 
    console.log(listing)
    await listing.save();  
    await user.listing.pop();//make sure only one object id is inserted
    await user.listing.push(listing._id);
    await user.save().then(result=>{
        return res.send(listing._id);
    //    return res.send(result);
        
    }).catch(err=>{
        return res.sendStatus(500).send({
            message:err.message|| "some error in storing Business details"
        });
        
    })
   
          

};
exports.findAll = (req, res) => {

    Listing.find()
    .then(listings => {
        res.send(listings)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving listing."
        });
    });
};
exports.findOne = (req, res) => {

    // const listing = await Listing.findOne();
    Listing.findOne({ _id: req.params.listingId })
    .then(listing => {
        if(!listing) {
            return res.status(404).send({
                message: "listing not found with id " + req.params.listingId
            });            
        }
        res.send(listing);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message:"listing not found with id " + req.params.listingId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving listing with id " + req.params.listingId
        });
    });

};

//Update Listing 


// Update a Listing identified by the listing id in the request
exports.update = (req, res) => {
    console.log(req.body)
    // Find Listing and update it with the request body
    Listing.findByIdAndUpdate(req.params.listingId, {
        listingType:req.body.listingType,
        business:req.body.business,
        tradingName:req.body.tradingName,
        email:req.body.email,
        phone:req.body.phone,
        website:req.body.website,
        address:req.body.address,
        fullPlaning:req.body.fullPlaning,
        partPlaning:req.body.partPlaning,
        coordinator:req.body.coordinator,
        tagline:req.body.tagline,
        description:req.body.description,
        fLink:req.body.fLink,
        tLink:req.body.tLink,
        gLink:req.body.gLink,
        iLink:req.body.iLink,
        pLink:req.body.pLink,
        yVideoLink:req.body.yVideoLink,
        vVideoLink:req.body.vVideoLink,
        vatNumber:req.body.vatNumber,
        category:req.body.category,
        region:req.body.region,
        paymentStatus:req.body.paymentStatus,
        listingStatus:req.body.listingStatus
        
      }, {new: true})
    .then(listing => {
        if(!listing) {
            return res.status(404).send({
                message: "Listing not found with id " + req.params.listingId
            });
        }
        res.send(listing);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Listing not found with id " + req.params.listingId
            });                
        }
        return res.status(500).send({
            message: "Error updating listing with id " + req.params.listingId
        });
    });

};
exports.findData = (req,res)=>{
    const category = req.query.category;
    const address = req.query.address;
    
    console.log(category)
    Listing.find({ address:address,category:category}).populate('logo')
    .then(listing => {
        if(!listing) {
            return res.status(404).send({
                message: "listing not found with id " 
            });            
        }
        res.send(listing);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message:"listing not found with id " 
            });                
        }
        return res.status(500).send({
            message: "Error retrieving listing with id " 
        });
    });

};

//find listing with email for reviews 

exports.findListing = (req,res)=>{
    const email = req.query.email;
    if(!email){
        res.send({
            message:"we could not search without email"
            
        })
        return;
    }
    console.log('recived email is',email)
    
    Listing.findOne({ email:email})
    .then(listing => {
        if(!listing) {
            return res.status(404).send({
                message: "listing not found with email " +email
            });            
        }
        res.send(listing);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message:"listing not found with email " +email
            });                
        }
        return res.status(500).send({
            message: "Error retrieving listing with email" +email
        });
    });

};
  //Delte Listin By Id 

  // Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    console.log('Recived Delte',req.params.listingId)
    Listing.findByIdAndRemove(req.params.listingId)
    .then(listing => {
        if(!listing) {
            return res.status(404).send({
                message: "Listing not found with id " + req.params.listingId
            });
        }
        res.send({message: "listing deleted successfully!",
                  business:listing.business});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Listing not found with id " + req.params.listingId
            });                
        }
        return res.status(500).send({
            message: "Could not delete listing with id " + req.params.listingId
        });
    });

};
