import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import{LoginService} from '../../shared/login/login.service'
import { User } from 'src/app/models/user/user';
import {Router,ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-nav-header-admin',
  templateUrl: './nav-header-admin.component.html',
  styleUrls: ['./nav-header-admin.component.css']
})
export class NavHeaderAdminComponent implements OnInit {
  user:User;
  @Output() public sidenavToggle = new EventEmitter();

  constructor(private _loginService:LoginService,
              private _router:Router,
              private _activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    if(this._loginService.loggedIn()){
      this._loginService.getUser()
    .subscribe((data)=>{
      this.user = data; 
    })
    }
    
  }
  public onToggleSidenav = () => { 
    this.sidenavToggle.emit();
  }

  login():boolean{
    return this._loginService.loggedIn();
    
  }
  logOut(){
    return this._loginService.logout();
  }
  showListing(){
    this._router.navigate(['view-listing'],{relativeTo: this._activatedRoute});
}
}
