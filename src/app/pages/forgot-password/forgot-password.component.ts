import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl,Validators} from '@angular/forms';
import {RegisterService}from '../../shared/register/register.service'
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
resetForm:FormGroup
  constructor(private _registerService:RegisterService) { }

  ngOnInit(): void {
    this.resetForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
  })
}
onSubmit():any{
  if (this.resetForm.invalid) {
    alert('Invalid Email')
    return;
  }
  
   this._registerService.resetPassword(this.resetForm.value)
    .subscribe((res)=>{
      alert("Your password details sent your email")
      
    },
    (err)=>{
      alert(err);
      
    })
   
 }
}


