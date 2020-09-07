import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl} from '@angular/forms'
import {Router} from '@angular/router'
import {LoginService}from '../../shared/login/login.service'
import {User} from '../../models/user/user';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginForm : FormGroup;
  information:User;
  isVerified:Boolean;
  
  constructor(private _loginService:LoginService,
              private _router :Router) { }

  ngOnInit(): void {
    
    this.isVerified = true;
    
    this.loginForm = new FormGroup({
      email: new FormControl,
      password : new FormControl
    })
  }
   onSubmit():any{
     
     this._loginService.login(this.loginForm.value)
      .subscribe((res)=>{
        this.isVerified =true;
        localStorage.setItem('token',res.token);
        // this.information = res;
        // console.log('infromation of user'+this.information.listing)
        this._router.navigate(['/profile'])
      },
      (err)=>{
        this.isVerified = false;
        console.log(err)
      })
     
   }
}
