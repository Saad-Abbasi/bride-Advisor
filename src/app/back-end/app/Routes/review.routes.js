module.exports = (app)=>{
    const review = require('../Controllers/review.controller')
   
   
   //Adding Reviews 
    app.post('/listing/review/:listingId', review.create);
    //Getting reviews

    app.get('/listing/review/:listingId', review.findOne);

    //delete

    // app.delete('/listing/gallery/:galleryId', gallery.delete);
}