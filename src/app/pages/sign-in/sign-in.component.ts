import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl,Validators} from '@angular/forms'
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
  errorMessage:string;
  showSpinner = false;
  
  constructor(private _loginService:LoginService,
              private _router :Router) { }

  ngOnInit(): void {
   
    this.isVerified = true;
    
    this.loginForm = new FormGroup({
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }
   onSubmit():any{
    if (this.loginForm.invalid) {
      alert('invalid form')
      return;
    }
    this.showSpinner = true;
     this._loginService.login(this.loginForm.value)
      .subscribe((res)=>{
        this.isVerified =true;
        localStorage.setItem('token',res.token);
        this.showSpinner = false;
        this._router.navigate(['/profile'])
      },
      (err)=>{
        this.isVerified = false;
        this.showSpinner = false;
        this.errorMessage = err;
        
      })
     
   }
}
