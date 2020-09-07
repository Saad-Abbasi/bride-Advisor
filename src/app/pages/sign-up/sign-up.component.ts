import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators,AbstractControl,FormBuilder} from '@angular/forms';
import {Router} from '@angular/router'
import {RegisterService} from '../../shared/register/register.service'
import {User} from '../../models/user/user';
import {ConfirmedValidator} from '../../models/validators/must-match.validator'
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user :User;
  regForm : FormGroup;
  submitted:boolean;
  constructor(private _register:RegisterService,
              private _router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.submitted = false;
    this.regForm = this.fb.group(
      {
        acType:    ["", Validators.required],
        firstName: ["", [Validators.required]],
        lastName: ["", [Validators.required]],
        email: ["", [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },{ 
        validator: ConfirmedValidator('password', 'confirmPassword')
      }
    );
    // this.regForm = new FormGroup({
    //   acType : new FormControl(),
    //   firstName :new FormControl('',[Validators.required, Validators.minLength(2),Validators.maxLength(10)]),
    //   lastName: new FormControl(),
    //   email : new FormControl('' ,[Validators.required, Validators.email]) ,
    //   password : new FormControl('',[Validators.required,Validators.minLength(6)]),
    //   confirmPassword : new FormControl('',Validators.required),

    // },
    // {
    //   // Used custom form validator name
    // ComparePassword("password", "confirmPassword")
    // }
    
    // );
    this.regForm.get('firstName').valueChanges.subscribe(
      result=>{
        console.log(result)
      }
    )
  }
regUser(){
  this.submitted = true
  if (this.regForm.invalid) {
    alert('invalid form')
    return;
  }
  console.log(this.regForm.value)
  this._register.register(this.regForm.value)
    .subscribe((res)=>{
      console.log(res)
      localStorage.setItem('token',res.token);
      this._router.navigate(['/signin']);
    },(err)=>{
      
      console.log(err);
    })
}
get f() { 
  return this.regForm.controls;
 }


}
