import { Component, OnInit } from '@angular/core';
import {Countries} from '../../models/country.model';
import {Regions} from '../../models/regions.model';
import {LoginService} from '../../shared/login/login.service';
import{HttpClient,HttpParams} from '@angular/common/http'
import {SearchData} from '../../models/search/search-data'


@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css']
})
export class FindComponent implements OnInit {
data:SearchData = {};
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
    // this._loginService.getTest();
    // let data = {
    //             website:"www.mcqser.com",
    //             tLink:"abctwfupdated"
    //           }
    // this.http.get('http://localhost:8080/listing/find/listing',({params:data})).subscribe(result=>{
    //   console.log(result)
    // })

  }
  selectCategory(catValue:any){
    if(catValue==1){
      // this.selectedCategory="Food And Drinks"
      this.data.category = catValue;
      this.selectedCategory=this.data.category;
      console.log('Cat value is  ' + catValue)
      // this.data.category = catValue;
      // console.log(this.data.category)
    }
  }
  findRegion = (region:any)=>{
    this.data.address = region;
    console.log(this.data)
   
  }
 searchListing(){
  let params = new HttpParams();

  params = params.append('category',this.data.category);
  params = params.append('address', this.data.address);
   this.http.get('http://localhost:8080/listing/find/listing',({params:params})).subscribe(result=>{
      console.log(result)
    },
    err=>console.log(err))
 }
}
