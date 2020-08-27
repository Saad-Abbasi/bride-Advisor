module.exports = (app)=>{
    const gallery = require('../Controllers/gallery.controller')
    const multer = require('multer')
    const path = require('path');
    var storage =   multer.diskStorage({
    
        destination: function(req, file, cb) {
            cb(null, 'uploads/');
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
   //Adding images to gallery
    app.post('/listing/gallery/:listingId',upload.single('galleryImage'), gallery.create);
    //Getting images from gallery

    app.get('/listing/gallery/:listingId', gallery.findOne);

    //delete

    app.delete('/listing/gallery/:galleryId', gallery.delete);
}