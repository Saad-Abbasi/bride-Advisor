import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient,HttpParams} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {ListingService} from '../../shared/listing/listing.service';
import {DataSharingService} from '../../shared/dataSharing/data-sharing.service';
import {Router} from '@angular/router'
import { ReviewsService } from 'src/app/shared/reviews/reviews.service';


@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css']
})
export class SearchViewComponent implements OnInit {
category:string;
address:string;
results:any;
logo :string;
stars: number[] = [1, 2, 3, 4, 5];
selectedValue: number;
backgroundImage:string;
listingId:string;
reviews:any;

  constructor(private _activtedRoute:ActivatedRoute,
              private http:HttpClient,
              private _listingService:ListingService,
              private _DataSharingService: DataSharingService,
              private _router:Router,
              private _reviewService:ReviewsService) { }

  ngOnInit(): void {
    this._activtedRoute.queryParams
    .subscribe(result=>{
      console.log(result.category + result.address)
      this.category = result.category;
      this.address = result.address
     this.searchData(this.category,this.address)
    })
    
  }
  //search data 

searchData(category,address){
  console.log('funcftion called')
  let params = new HttpParams();
  params =  params.append('category',category);
  params = params.append('address', address);
  this.http.get(`${environment.api_url}/listing/find/listing`,({params:params}))
   .subscribe(data=>{
     console.log(' Data recived in listin result',data)
    this.results = data;
    this.listingId = this.results[0]._id;

    this.getGalleryImages(this.listingId);
    this.calculateAverageReviews(this.listingId);

    this.logo =this.results[0].logo[0].image;
    },
    err=>console.log(err))
  }

  //getting Gallery images
  getGalleryImages(listingId){
    console.log('listing id');
    console.log(listingId);
     this._listingService.getGalleryImages(listingId).
     subscribe((galleryData:any)=>{
       console.log(galleryData);
      this.backgroundImage = galleryData.gallery[0].image;
      console.log(this.backgroundImage, 'background image url')
     //  console.log(this.galleryData.gallery[0].image)
     })
  }


 async viewProfile (listingId){
    console.log('Got lisitng id', listingId)
    // this._DataSharingService.sendListingId(listingId);
    this._router.navigate(['/view-listing/'+this.listingId]);
  }


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
}
