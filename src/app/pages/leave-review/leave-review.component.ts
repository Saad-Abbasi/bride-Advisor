import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup} from '@angular/forms';
import {LoginService} from '../../shared/login/login.service';
import {HttpClient,HttpParams} from '@angular/common/http';
import{ReviewsService} from '../../shared/reviews/reviews.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-leave-review',
  templateUrl: './leave-review.component.html',
  styleUrls: ['./leave-review.component.css']
})
export class LeaveReviewComponent implements OnInit {
  reviewForm:FormGroup;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  fullName:string;
  isListing:Boolean;
  businessName:string;
  listingId:string; //for posting reviews 
  
  constructor(private _loginService: LoginService,
              private http:HttpClient,
              private _reviewService:ReviewsService) { }

  ngOnInit(): void {
    this.isListing = false;
    this.reviewForm = new FormGroup({
      name: new FormControl(),
      // email:new FormControl(),
      description:new FormControl(),
      rating:new FormControl,
    })
    this._loginService.getUser().subscribe((result)=>{
      console.log(result)
      this.fullName =result.firstName;
      // this.fullName =result.firstName +''+ result.lastName
      // this.name = result.firstName +" "+ result.lastName
    },(err)=>{
      console.log(err)
    })
  }
  //Search data 
  searchListing(email:string){
    this.isListing = false
    
    console.log(email)
    let params = new HttpParams();
    params = params.append('email', email);
    this.http.get(`${environment.api_url}/find/listing/review/data`, ({ params: params }))
      .subscribe((data:any) => {
        this.isListing = true;
        this.businessName = data.business;
        this.listingId = data._id;//for posting reviews 
        console.log(data.business,"Listing Id = ",this.listingId)
      },
        err => console.log(err))

  }
  //Star Rating
  countStar(star) {
    this.selectedValue = star;
    console.log('Value of star', star);
  }
  //function to save review
  submitReview(){
    if(!this.selectedValue){
      this.selectedValue = 5
    }
    this.reviewForm.patchValue({
      name:this.fullName,
      rating:this.selectedValue
    })
    console.log(this.reviewForm.value)
    //Submiting the request 
    this._reviewService.saveReview(this.reviewForm.value,this.listingId)
    .subscribe((result)=>{
      console.log(result);
      location.reload();
    },
    (err)=>console.log(err))
  }
}
