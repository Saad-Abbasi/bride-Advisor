import { Component, OnInit } from '@angular/core';
import {ConfirmedValidator} from '../../models/validators/must-match.validator';
import {FormGroup, Validators,FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {RegisterService} from '../../shared/register/register.service';
import {LoginService} from '../../shared/login/login.service';
@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  userEmail:string;
  updatePassForm : FormGroup;
  constructor(private _register:RegisterService,
              private _router: Router,
              private fb: FormBuilder,
              private _loginService:LoginService) { }

  ngOnInit(): void {
    this._loginService.getUser().subscribe(res=>{
      this.userEmail= res.email;
    },(err)=>{
      console.log(err)
    }),

    this.updatePassForm = this.fb.group(
      {
        
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },{ 
        validator: ConfirmedValidator('password', 'confirmPassword')
      }
    );
  }
  updatePassword(){
    if (this.updatePassForm.invalid) {
      alert('invalid form')
      return;
    }
    else if(!this.userEmail){
      alert("Problem in acessing user email");
      return;
    }
   else{
    this._register.updatePassword(this.updatePassForm.get('password').value,this.userEmail)
    .subscribe((res)=>{
      alert("Password Updated")
      this._router.navigate(['/signin']);
    },(err)=>{
      alert(err);
      
    })
   }
   
  }
  get f() { 
    return this.updatePassForm.controls;
   }

}
