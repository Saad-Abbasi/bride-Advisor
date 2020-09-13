import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import{LoginService} from '../../shared/login/login.service'
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit {
  // login :boolean;
 user:User;
  @Output() public sidenavToggle = new EventEmitter();

  constructor(private _loginService:LoginService) { }

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
}
