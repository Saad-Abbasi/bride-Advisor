import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup}from '@angular/forms'
import {LoginService} from '../../shared/login/login.service';
import {ListingService} from '../../shared/listing/listing.service'
import {User} from '../../models/user/user';
import {Gallery} from '../../models/gallery/gallery';
import {Listing} from '../../models/listing/listing'
import { MatDialog } from '@angular/material/dialog';
import { ProfileImgComponent } from '../dialogs/profile-img/profile-img.component';
import { GalleryComponent } from '../dialogs/gallery/gallery.component';
import {ReviewsService} from '../../shared/reviews/reviews.service'
import { Review } from 'src/app/models/reviews/review';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId:String;
  listingId:String;
  logoId:String;
  user:User;
  disableTextbox= true;
  businessDetails:FormGroup;
  isDisabled = true;
  listingData:any;
  logoData:any;
  galleryData:Object;
  profileImage='';
  listingTitle:String;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedStarValue: number;
  reviews:any;

  //Data for Material Option

  selectedValue: string;
  selectedCar: string;

 
  

  constructor(private _loginService :LoginService,
              private _listingService:ListingService,
              private _reviewService:ReviewsService,
              private _dialog: MatDialog
              ) { }
                  
  ngOnInit(){
    this.businessDetails = new FormGroup({
      listingType: new FormControl({ value: '', disabled: this.isDisabled}),
      business: new FormControl,
      tradingName: new FormControl,
      email: new FormControl,
      phone:new FormControl,
      website:new FormControl,
      category:new FormControl,
      address:new FormControl,
      //Sub Categories also Remove in future
      fullPlaning:new FormControl,
      partPlaning: new FormControl,
      coordinator: new FormControl,
      //Description
      tagline: new FormControl,
      description:new FormControl,
      //Social links
      fLink:new FormControl({ value: '', disabled: this.isDisabled}),
      tLink:new FormControl({ value: '', disabled: this.isDisabled}),
      gLink:new FormControl({ value: '', disabled: this.isDisabled}),
      iLink: new FormControl({ value: '', disabled: this.isDisabled}),
      pLink:new FormControl({ value: '', disabled: this.isDisabled}),
      //videos
      yVideoLink:new FormControl({ value: '', disabled: this.isDisabled}),
      vVideoLink:new FormControl({ value: '', disabled: this.isDisabled}),
      vatNumber:new FormControl({ value: '', disabled: this.isDisabled})
    })
    //getting listing Details
    // this.getProfile()
    //getting profile detailse
    this.getUser();
    this.loadStripe();
  }
  //methods
  getUser(){
    this._loginService.getUser().
      subscribe((user)=>{
        this.userId = user._id;
        console.log(this.userId)
        
       this.listingId = user.listing[0];
       this.isListing()
       console.log(this.listingId);
       
      })
  }
 
  //getting listing information

  //check listing is available ?
  isListing():Boolean{
    if(!this.listingId){
      this.listingTitle = "Add Listing"
      console.log("Listing does not exist")
      return false;
    }
    else{
      this.listingTitle = "Update Listing"
      this.getProfileAndEdit(this.listingId);
      this.getReviews(this.listingId);
      return true;
    }
  }
  getProfileAndEdit(listingId)
  {
    this._listingService.getListing(listingId).
    subscribe((listingId)=>{
     //Update value 
    
     this.listingData = listingId;
     this.editProfile(this.listingData)
     console.log('listing data')
     console.log(this.listingData)
     console.log(this.listingData.profileImage);
    //  console.log(this.profileImage)
     this.logoId = this.listingData.logo[0];
     console.log(this.logoId);
     this.getLogo(this.logoId);
     this.getGalleryImages(this.listingId)
    })
  } 
   //getting reviews
   getReviews(listingId:String){
    this._reviewService.getReviews(listingId)
      .subscribe(result=>{
        console.log('reviews are ',result)
        this.reviews = result;
         console.log(this.reviews[0].name)
      })
  }
  //Edit profile 

  editProfile(listingData:Listing){
    this.businessDetails.patchValue({
      listingType:listingData.listingType,
      business:listingData.business,
      tradingName:listingData.tradingName,
      email:listingData.email,
      phone:listingData.phone,
      website:listingData.website,
      category:listingData.category,
      address:listingData.address,
      fullPlaning:listingData.fullPlaning,
      partPlaning:listingData.partPlaning,
      coordinator:listingData.coordinator,
      tagline:listingData.tagLine,
      description:listingData.description,
      fLink:listingData.fLink,
      tLink:listingData.tLink,
      gLink:listingData.gLink,
      iLink:listingData.iLink,
      pLink:listingData.pLink,
      yVideoLink:listingData.yVideoLink,
      vVideoLink:listingData.vVideoLink,
      vatNumber:listingData.vatNumber
    })
  }
   //Getting Logo 
   getLogo(logoId:String){
      this._listingService.getLogo(logoId)
      .subscribe((result)=>{
        this.logoData = result;
        this.profileImage = this.logoData.image
        // console.log(this.logoData.image)
      },
      (err)=>{
        console.log(err)
      })
   }
   //getting Gallery images
   getGalleryImages(listingId){
     console.log('listing id');
     console.log(listingId)
      this._listingService.getGalleryImages(listingId).
      subscribe((gallery)=>{
       this.galleryData = gallery;
      //  console.log(this.galleryData.gallery[0].image)
      })
   }
  saveBusiness(){
    if(!this.isListing()){
      console.log('Excute Post method')
      // Add Listing 
      console.log(this.businessDetails.value)
      this._listingService.addListing(this.businessDetails.value,this.userId).
      subscribe((result)=>{
        console.log(result)
        location.reload();
      },(err)=>{
        console.log(err)
      })
    }
    else{
      
      //Updating
      console.log(this.businessDetails.value)
      this._listingService.updateListing(this.businessDetails.value,this.listingId).
      subscribe((result)=>{
        console.log(result)
        location.reload();
      },(err)=>{
        console.log(err)
      })
    }
    
   }
  // Dialoge for profile image
  profileImageDialog(){
  let dialogRef = this._dialog.open(ProfileImgComponent,{
    height: '400px',
    width: '600px',
  });
  dialogRef.afterClosed()
    .subscribe(result=>{
      location.reload();
      console.log(`Dialoge Result: ${result}`)
    })

}
// Dialge for imgae gallery
galleryDialog(){
  let dialogRef = this._dialog.open(GalleryComponent,{
    height: '400px',
    width: '600px',
  });
  dialogRef.afterClosed()
    .subscribe(result=>{
      console.log(`Dialoge Result: ${result}`)
    })

}

//Delete gallery images
deleteGallery(id:String){
  this._listingService.deleteGalleryImage(id).
  subscribe((result)=>{
    console.log(result);
    location.reload();
  },(err)=>{
    console.log(err)
  })
}

//method for enable disable text box
toggleEnable(id:Number) {
  switch(id){
    case 1:{
      this.businessDetails.controls.fLink.enable();
      break;
    }
    case 2:{
      this.businessDetails.controls.tLink.enable();
      break;
    }
    case 3:{
      this.businessDetails.controls.gLink.enable();
      break;
    }
    case 4:{
      this.businessDetails.controls.iLink.enable();
      break;
    }
    case 5:{
      this.businessDetails.controls.pLink.enable();
      break;
    }
    case 6:{
      this.businessDetails.controls.yVideoLink.enable();
      break;
    }
    case 7:{
      this.businessDetails.controls.vVideoLink.enable();
      break;
    }
    case 8:{
      this.businessDetails.controls.vatNumber.enable();
      break;
    }
    default: { 
      this.isDisabled = true;
      break; 
   } 
  }
  
}  
//method for disable 
toggleDisable(id:Number){
  switch(id){
    case 1:{
      this.businessDetails.controls.fLink.disable();
      break;
    }
    case 2:{
      this.businessDetails.controls.tLink.disable();
      break;
    }
    case 3:{
      this.businessDetails.controls.gLink.disable();
      break;
    }
    case 4:{
      this.businessDetails.controls.iLink.disable();
      break;
    }
    case 5:{
      this.businessDetails.controls.pLink.disable();
      break;
    }
    case 6:{
      this.businessDetails.controls.yVideoLink.disable();
      break;
    }
    case 7:{
      this.businessDetails.controls.vVideoLink.disable();
      break;
    }
    case 8:{
      this.businessDetails.controls.vatNumber.disable();
      break;
    }
    default: { 
      this.isDisabled = true;
      break; 
   } 
  }
    
}
//Methods for rating and reviews
countStar(star) {
  this.selectedStarValue = 5;
  console.log('Value of star', star);
}
//Checkout Stripe 


loadStripe() {
     
  if(!window.document.getElementById('stripe-script')) {
    var s = window.document.createElement("script");
    s.id = "stripe-script";
    s.type = "text/javascript";
    s.src = "https://checkout.stripe.com/checkout.js";
    window.document.body.appendChild(s);
  }
}
pay(amount) {    
 
  var handler = (<any>window).StripeCheckout.configure({
    key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
    locale: 'auto',
    token: function (token: any) {
      // You can access the token ID with `token.id`.
      // Get the token ID to your server-side code for use.
      console.log(token)
      alert('Token Created!!');
    }
  });

  handler.open({
    name: 'Bride Advisor',
    description: '',
    amount: amount * 100
  });

}
}
