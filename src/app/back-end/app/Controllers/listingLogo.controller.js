const Logo = require('../Models/listingLogo.model');
const Listing = require('../Models/listing.model');
const mongoose = require('mongoose')

exports.create = async  (req, res)=> {
 
    console.log(req.file)
    const listing = await Listing.findOne({ _id: req.params.listingId });
    // Save image and description
    
    console.log(req.body);
    const logo =  new Logo({
        _id:mongoose.Types.ObjectId(),
      title:req.body.title,
      description:req.body.description
    });
    //img
    if(req.file !== undefined){
        logo.image = req.protocol+'://'+ req.get('Host')+'/uploads'+'/'+req.file.filename;
        console.log(logo.image)
    }
    // Display uploaded image for user validation
    
    // Save Profile/listing 
    console.log(logo)
    await logo.save(); 
    await listing.logo.pop();//make sure only one object id is inserted
    await listing.logo.push(logo._id);
    await listing.save().then(result=>{
       return res.send(logo._id);
        
    }).catch(err=>{
        return res.sendStatus(500).send({
            message:err.message|| "some error in storing Business details"
        });
        
    })
   
          

};

exports.getLogo=(req,res)=>{
    Logo.findOne({ _id: req.params.logoId })
    .then(result =>{
        res.send(result);
    }).catch(err =>{
        res.status(500).send({
            message:err.message||"Some Error occured while getting the logo"
        })
    })
};