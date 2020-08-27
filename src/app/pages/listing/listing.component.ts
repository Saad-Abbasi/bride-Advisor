import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  

  constructor(private _http:HttpClient) { }

  ngOnInit(): void {
  //   this._http.get('http://localhost:8080/profile')
  //   .subscribe((data)=>{
  //     console.log(data)
  //   },
  //   (err)=>{
  //     console.log(err)
  //   })
  }



}
