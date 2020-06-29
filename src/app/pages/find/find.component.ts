import { Component, OnInit } from '@angular/core';
import {Countries} from '../../models/country.model';
import {Regions} from '../../models/regions.model'


@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css']
})
export class FindComponent implements OnInit {
  isCountrySelected:boolean;
  
  regions: Regions[];

  countries: Countries[]=[
    {id:1, name:'US', },
    {id:2,name:'Afg'},
    {id:3,name:'pk'}
  ];
  
  
  constructor() { }
  
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
    this.isCountrySelected = true;
  }

}
