import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient,HttpParams} from '@angular/common/http'


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
  constructor(private _activtedRoute:ActivatedRoute,
              private http:HttpClient) { }

  ngOnInit(): void {
    this._activtedRoute.queryParams
    .subscribe(result=>{
      console.log(result.category + result.address)
      this.category = result.category;
      this.address = result.address
     this.searchData(this.category,this.address)
    })
    // Need To update Later 
     this.selectedValue = 5;
  }
  //search data 

searchData(category,address){
  console.log('funcftion called')
let params = new HttpParams();
  params = params.append('category',category);
  params = params.append('address', address);
   this.http.get('http://localhost:8080/listing/find/listing',({params:params}))
   .subscribe(data=>{
    this.results = data;
    console.log(this.results)
      this.logo =this.results[0].logo[0].image;
    },
    err=>console.log(err))
  }

  countStar(star) {
   5;
    console.log('Value of star', star);
  }
}
