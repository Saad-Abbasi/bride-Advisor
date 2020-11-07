import { Component,OnInit } from '@angular/core';
import {Router,ActivatedRoute, NavigationEnd}from '@angular/router'
import {IconService} from '../app/shared/icons/icon.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

  
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'bridalAdvisor';
  dashboard :boolean;
  url:string;
  constructor(private _router:Router,
              private _activatedRoute:ActivatedRoute ,
              private iconService: IconService){}
 ngOnInit(){
   this.dashboard = false;
  this._router.events.subscribe(event => {
    if(event instanceof NavigationEnd) {
      this.url = event.urlAfterRedirects;
      // console.log('url is', this.url);
      
      
    }
  })

  //loading icons

  this.iconService.registerIcons();
 }
 isDashboard = ():boolean=>{
   let urlCurrent = this.url;
  if(urlCurrent){
    if(urlCurrent.includes('dashboard')){
      return true;
    }
    else{
      return false;
    }
   }
  }
 
}

