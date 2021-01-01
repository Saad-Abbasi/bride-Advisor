import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators,FormBuilder} from '@angular/forms';
import {Router} from '@angular/router'
import {RegisterService} from '../../../../shared/register/register.service'
import {User} from '../../../../models/user/user';
import {ConfirmedValidator} from '../../../../models/validators/must-match.validator';
@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit {

  user :User;
  regForm : FormGroup;
  submitted:boolean;
  showSpinner = false;
  constructor(private _register:RegisterService,
              private _router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.submitted = false;
    this.regForm = this.fb.group(
      {
        acType:    ["admin", Validators.required],
        firstName: ["", [Validators.required]],
        lastName: ["", [Validators.required]],
        email: ["", [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
      },{ 
        validator: ConfirmedValidator('password', 'confirmPassword')
      }
    );

    
  }
regUser(){
  this.submitted = true;
  
  if (this.regForm.invalid) {
    alert('invalid form')
    return;
  }
  this.showSpinner = true;
  console.log(this.regForm.value)
  this._register.register(this.regForm.value)
    .subscribe((res)=>{
      console.log('user added' ,res)
      this.showSpinner = false;
    },(err)=>{
      
      console.log(err);
      this.showSpinner = false;
    })
}
get f() { 
  return this.regForm.controls;
 }


}

