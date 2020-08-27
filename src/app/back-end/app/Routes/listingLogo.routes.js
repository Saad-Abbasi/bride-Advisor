module.exports = (app) => {
    const listingLogo = require('../Controllers/listingLogo.controller');
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

    
    //listing logo 

    app.post('/listing/logo/:listingId',upload.single('profileImage'), listingLogo.create);
    
    app.get('/listing/logo/:logoId',listingLogo.getLogo)

    

    // Retrieve all Notes
//    app.get('/teacher/:courseId/topic', topic.findAll);
//    //
//    app.get('/course/:topicId', topic.findOne);
   

    
}