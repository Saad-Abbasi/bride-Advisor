module.exports = (app) => {
    const listing = require('../Controllers/listing.controller');
    const multer = require('multer')
    const path = require('path');
    var storage =   multer.diskStorage({
        // destination: function (req, file, callback) {
        //   callback(null, './uploads');
        // destination:'./uploads',
        destination: function(req, file, cb) {
            cb(null, './uploads');
        },
        filename: function(req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
      });
    
    
    
    //filter
      const fileFilter = (req,file,cb)=>{
        if(file.mimetype==='image/jpeg'||file.mimetype==='image/jpg'||file.mimetype==='image/png'){
            cb(null,true);
        }else{
    
            cb(null,false);
        }
    
    }
    const upload = multer({storage:storage,
        limits:{
        fileSize:1024*1024*5
        },
        fileFilter:fileFilter
    });

    app.post('/listing/:userId', listing.create);
    //listing logo 

    // app.post('/listing/logo/:listingId',upload.single('profileImage'), listing.create);
    // app.post('/listingp',upload.single('file') ,(req,res)=>{
    //     console.log(req.file)
    // });

    

    // Retrieve listing for particular id 
   app.get('/listing/:listingId',listing.findOne);
    
   //Update listing 
   app.put('/listing/:listingId', listing.update);
   
    app.get('/listing/find/:data',listing.findData)
    
}