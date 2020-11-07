import { Component, OnInit } from '@angular/core';
import {Countries} from '../../models/country.model';
import {Regions} from '../../models/regions.model';
import {LoginService} from '../../shared/login/login.service';
import{HttpClient,HttpParams} from '@angular/common/http'
import {SearchData} from '../../models/search/search-data';
import {Router} from '@angular/router'


@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css']
})
export class FindComponent implements OnInit {
data:SearchData = {};
breakPoint:any;
indexTab:number = 0;
// category:String
//  address:String;
 public selectedCategory ="";
  isCountrySelected:boolean;
  
  regions: Regions[];

  countries: Countries[]=[
    {id:1, name:'US', },
    {id:2,name:'Afg'},
    {id:3,name:'pk'}
  ];
  
  
  constructor(private _loginService:LoginService, 
              private http:HttpClient,
              private _router:Router
              ) { }
  
 onChangeCountry(id:number){
   
  if(id == 1){
    this.isCountrySelected = false;
   this.regions = [   
   {Cid:1,id:1,name:'Alabama'},
   {Cid:1,id:2,name:'Alaska'},
   {Cid:1,id:3,name:'American Samoa'},
   {Cid:1,id:4,name:'Arizona'},
     
    ]
  }
 }
  ngOnInit(): void {
    // tLink="abctwfupdated"
    // website="www.mcqser.com"
    this.isCountrySelected = true;
    this.breakPoint = (window.innerWidth <= 400) ? 2 : 4;

  }
  selectCategory(catValue:any,event){
    this.indexTab = 1;
    this.selectedCategory = event.srcElement.alt; //update button with current event
    this.data.category = catValue; //send value for search
  }
  findRegion = (region:any)=>{
    this.data.address = region;
    console.log(this.data)
   
  }
 searchListing(){
  this._router.navigate(['/search-view'], 

  { queryParams: { category: this.data.category,address:this.data.address } 

  });

 }
 //responsive 
 onResize(event) {
  this.breakPoint = (event.target.innerWidth <= 400) ? 2 : 4;
}
}
