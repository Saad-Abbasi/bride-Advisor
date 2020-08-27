import { Component, OnInit, ElementRef } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {MatDialog} from '@angular/material/dialog';
import { ImageDialogeComponent } from '../dialogs/image-dialoge/image-dialoge.component';
// import{ViewDialogInteractionService} from '../../shared/component-interaction/view-dialog-interaction.service'
import { LoginService } from 'src/app/shared/login/login.service';
import { ListingService } from 'src/app/shared/listing/listing.service';
import { ImageService } from 'src/app/shared/images/image.service';
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


data = "Saad"

  public ratingArr = [];
  constructor(private el: ElementRef,
              private dialog:MatDialog,
              // private _SendImage:ViewDialogInteractionService,
              private _userService:LoginService,
              private _listingService:ListingService,
              private _galleryService:ImageService,
              // private snackBar: MatSnackBar
              ) { }

  ngOnInit(){
    this._userService.getUser()
      .subscribe((result)=>{
        this.listingId = result.listing[0];
        this.getProfile(this.listingId)
        this.getGallery(this.listingId)
      })
   
  }
  //getting Safe url for iframe



  //method for get profile details 
  getProfile(listingId){
    this._listingService.getListing(listingId)
      .subscribe((result)=>{
        console.log(result)
        this.listingData = result;
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
      console.log(this.galleryData.image)
     
    })
}
carouselData = [
  { text: 'Slide 1 PM', dataMerge: 2, width: 300, dotContent: 'text1',image:"https://picsum.photos/640/480?image=1"},
  { text: 'Slide 2 PM', dataMerge: 1, width: 500, dotContent: 'text2',image:"https://picsum.photos/640/480?image=2"},
  { text: 'Slide 3 PM', dataMerge: 3, dotContent: 'text3',image:"https://picsum.photos/640/480?image=3"},
  { text: 'Slide 4 PM', width: 450, dotContent: 'text4',image:"https://picsum.photos/640/480?image=4"},
  { text: 'Slide 5 PM', dataMerge: 2, dotContent: 'text5',image:"https://picsum.photos/640/480?image=5"},
  // { text: 'Slide 6', dotContent: 'text5'},
  // { text: 'Slide 7', dotContent: 'text5'},
  // { text: 'Slide 8', dotContent: 'text5'},
  // { text: 'Slide 9', dotContent: 'text5'},
  // { text: 'Slide 10', dotContent: 'text5'},
];
title = 'owl-carousel-libdemo';
owlNext = '&rarr;';
owlPrev = '&larr;';


customOptions: OwlOptions = {
  // autoWidth: true,
  loop: true,
  // items: '10',
  margin: 10,
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
  stagePadding: 300,
  nav: false
}
activeSlides: any;

getPassedData(data: any) {
  this.activeSlides = data;
  // console.log(this.activeSlides);
}
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



