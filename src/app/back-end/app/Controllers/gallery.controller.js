const Gallery = require('../Models/gallery.model');
const Listing = require('../Models/listing.model');
const mongoose = require('mongoose')

exports.create = async  (req, res)=> {
 
    console.log(req.file)
    const listing = await Listing.findOne({ _id: req.params.listingId });
    // Save image and description
    
    console.log(req.body);
    const gallery =  new Gallery({
        _id:mongoose.Types.ObjectId(),
      title:req.body.title,
      description:req.body.description
    });
    //img
    if(req.file !== undefined){
        gallery.image = req.protocol+'://'+ req.get('Host')+'/uploads'+'/'+req.file.filename;
        console.log(gallery.image)
    }
    // Display uploaded image for user validation
    
    // Save Profile/listing 
    console.log(gallery)
    await gallery.save();  
    // await user.listing.pop();//make sure only one object id is inserted
    await listing.gallery.push(gallery._id);
    await listing.save().then(result=>{
       return res.send(result);
        
    }).catch(err=>{
        return res.sendStatus(500).send({
            message:err.message|| "some error in storing Business details"
        });
        
    })
   
          

};

exports.findOne = (req, res) => {
    Listing.findById(req.params.listingId).populate('gallery').populate('gallery.image')
    .then(gallery => {
        if(!gallery) {
            return res.status(404).send({
                message: "Gallery not found with id " + req.params.listingId
            });            
        }
        console.log(gallery)
        res.send(gallery);
        // return res.status(200).send({
        //     message:"data recived"
        // })
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Gallery not found with id " + req.params.listingId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving gallery with id " + req.params.listingId
        });
    });

};
//Delete gllery image by id

exports.delete = (req, res) => {
    Gallery.findByIdAndDelete(req.params.galleryId)
    .then(gallery => {
        if(!gallery) {
            return res.status(404).send({
                message: "Gallery  not found with id " + req.params.galleryId
            });
        }
        res.send({message: "Gallery image deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Gallery not found with id " + req.params.galleryId
            });                
        }
        return res.status(500).send({
            message: "Could not delete gallery with id " + req.params.galleryId
        });
    });
    };