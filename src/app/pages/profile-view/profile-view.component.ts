import { Component, OnInit, ElementRef } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {MatDialog} from '@angular/material/dialog';
import { ImageDialogeComponent } from '../dialogs/image-dialoge/image-dialoge.component';
import { LoginService } from 'src/app/shared/login/login.service';
import { ListingService } from 'src/app/shared/listing/listing.service';
import { ImageService } from 'src/app/shared/images/image.service';
import {ReviewsService} from '../../shared/reviews/reviews.service';
import {DataSharingService} from '../../shared/dataSharing/data-sharing.service';
import {ActivatedRoute} from '@angular/router';
// import {} from 

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']

})
export class ProfileViewComponent implements OnInit {
listingId:String;
listingData:any;
userId:String;
logoId:String;
logoData:any;
galleryData:any;
profileImage:String;
iframe:any;
stars: number[] = [1, 2, 3, 4, 5];
selectedValue: number;
controllerSrc:any;
listingType:string;
reviews:any;
backgroundImage:string;

data = "Saad"

  public ratingArr = [];
  constructor(private el: ElementRef,
              private dialog:MatDialog,
              // private _SendImage:ViewDialogInteractionService,
              private _userService:LoginService,
              private _listingService:ListingService,
              private _galleryService:ImageService,
              private _reviewService:ReviewsService,
              private _DataSharingService:DataSharingService,
              private _activtedRoute:ActivatedRoute
              ) 
              { 
                if(!this._userService.loggedIn()){

                    let data =  this._activtedRoute.snapshot.data['profileData'];
                    console.log('listing data with snapshot',data);
                    this.listingData = [data.listingData][0];
                    let galleryDataTemp:any = [data.galleryData][0];
                    this.galleryData = galleryDataTemp.gallery;
                    // console.log('Gallery image is ', this.galleryData[0].image);
                    this.backgroundImage = this.galleryData[0].image;
                    this.getLogo(this.listingData.logo[0]);
                    this.getReviews(this.listingData._id);
                    this.calculateAverageReviews(this.listingData._id);
                    console.log('listingData is  =>>', this.listingData , 'galleryData is',this.galleryData)
                }

              }

  ngOnInit(){
    if(this._userService.loggedIn()){
      console.log('come in if')
      this._userService.getUser()
      .subscribe((result)=>{
        this.listingId = result.listing[0];
        this.getProfile(this.listingId);
        this.getGallery(this.listingId);
        this.getReviews(this.listingId);
       this.calculateAverageReviews(this.listingId);
      });
    }
    else{
      this._DataSharingService.listingId$.subscribe(result=>{
      this.listingId = result;
      console.log('come in else' , this.listingId );
      
      // this._activtedRoute.data.subscribe(result =>{
      //   this.listingData = result.profileData;
      //   console.log('Data from reesolver address',this.listingData.address);
      //   // console.log(this.listingData.profileData.business ,' business is');
      // });
      console.log('Data Recived by snapshot',this.listingData.business)
      // this.getLogo(this.listingData.logo[0]);
      // this.getProfile(this.listingId);
      // this.getGallery(this.listingId);
      // this.getReviews(this.listingId);
      // this.calculateAverageReviews(this.listingId);
      })
      
    }
    if (!this.listingData.listingType){
      this.listingType = 'Free';
    }
     
  }
  //getting Safe url for iframe



  //method for get profile details 
  getProfile(listingId){
    this._listingService.getListing(listingId)
      .subscribe((result)=>{
        console.log(result,'Result of search preview')
        this.listingData = result;
        if (!this.listingData.listingType){
          this.listingType = 'Free';
        }
        this.getLogo(this.listingData.logo[0]);
        
      })
  }
getLogo(logoId:String){
  this._listingService.getLogo(logoId)
    .subscribe((result)=>{
      this.logoData = result;
      this.profileImage = this.logoData.image
    })
}
getGallery(id:String){
  console.log('id of listing'+ id)
  this._galleryService.getGalleryImages(id)
    .subscribe((result:any)=>{
      console.log(result)
      this.galleryData = result.gallery;
      console.log('Gallery image is ', this.galleryData[0].image);
      this.backgroundImage = this.galleryData[0].image;
     
    })
}


//Get reviews

getReviews(listingId:String){
     
  this._reviewService.getReviews(listingId)
    .subscribe(result=>{
      console.log('reviews are ',result)
      this.reviews = result;
        this.reviews.forEach(review => {
        let tempName = review.name.split(' ');
         review.name = tempName[0];
      });
      
     
    })
}

//Calculate Reviews 

calculateAverageReviews(listingId:String){

  this._reviewService.getReviews(listingId)
  .subscribe((result:any)=>{
    console.log('Review Array is ',result)
    this.reviews = result;
    let totalReviews =  Object.keys(this.reviews).length
    let count = 0;
    let sum = 0;
    let stars = [0,0,0,0,0]; //Intially all type of ratings are null 

    for(let i = 0; i < totalReviews; i++){
       let starValue = this.reviews[i].rating;
       if(starValue == 5){
         stars[4] +=1;
       }
       else if(starValue == 4){
         stars[3] +=1;
       }
       else if(starValue == 4){
        stars[2] +=1;
      }
      else if(starValue == 4){
        stars[1] +=1;
      }
      else if(starValue == 4){
        stars[0] +=1;
      }
    }
    
    console.log('Stars are ', stars)
    
    stars.forEach(function(value, index){
      count += value;
      sum += value * (index + 1);
    });
    this.selectedValue = sum/count;
    // console.log('Rating calculation is ', sum/count);
  })

}

customOptions: OwlOptions = {
  // autoWidth: true,
  loop: true,
  // items: '10',
  margin: 16,
  // slideBy: 'page',
  // merge: true,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  autoplaySpeed: 2000,
  dotsSpeed: 500,
  autoplayMouseleaveTimeout: 5000,
  dots: false,
  // dotsData: true,
  // mouseDrag: false,
  // touchDrag: false,
  // pullDrag: false,
  smartSpeed: 400,
  // fluidSpeed: 499,
  dragEndSpeed: 350,
  // dotsEach: 4,
  center: true,
  rewind: true,
  // rtl: true,
  // startPosition: 1,
  
  // navText: [ '<i class=fa-chevron-left>left</i>', '<i class=fa-chevron-right>right</i>' ],
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 2
    },
    900: {
      items: 1
    }
  },
  stagePadding: 500,
  nav: false
}
activeSlides: any;

getPassedData(data: any) {
  this.activeSlides = data;
  // console.log(this.activeSlides);
}


//Options for Reviews 

reviewOptions: OwlOptions = {
  // autoWidth: true,
  loop: true,
  // items: 5,
  margin: 16,
  // slideBy: 'page',
  // merge: true,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  autoplaySpeed: 2000,
  dotsSpeed: 500,
  autoplayMouseleaveTimeout: 5000,
  dots: false,
  // dotsData: true,
  // mouseDrag: false,
  // touchDrag: false,
  // pullDrag: false,
  smartSpeed: 400,
  // fluidSpeed: 499,
  dragEndSpeed: 350,
  // dotsEach: 4,
  center: true,
  rewind: true,
  // rtl: true,
  // startPosition: 1,
  
  // navText: [ '<i class=fa-chevron-left>left</i>', '<i class=fa-chevron-right>right</i>' ],
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 2
    },
    900: {
      items: 1
    }
  },
  stagePadding: 350,
  nav: false
}


//For now skipped 
openDialog(imageUrl:String) {
  console.log(imageUrl)
  let dialogRef = this.dialog.open(ImageDialogeComponent, {
    panelClass: 'app-full-bleed-dialog',
    data: { imageUrl: imageUrl },
    height: '500px',
    width: '700px',
    autoFocus:false,

  }
  );
  dialogRef.afterClosed().subscribe(result=>{
    console.log(`dialog result is ${result}`)
  })

  //Methods for rating and reviews

}
// Sending image to View Dialog
// sendImage(image:string){
//  this._SendImage.sendImageUrl(image);
// }





//methods for rating
countStar(star) {
  // this.selectedValue = 5;
  console.log('Value of star', star);
}


}



