import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {LoginService} from '../../shared/login/login.service'
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  user:User;
  @Output() sidenavClose = new EventEmitter();
  constructor(private _loginService:LoginService) { }

  ngOnInit(): void {
    this._loginService.getUser()
    .subscribe((data)=>{
      this.user = data;
      
    })
  }
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
  login():boolean{
    return this._loginService.loggedIn()
  }
  logout(){
    this._loginService.logout()
  }
}
