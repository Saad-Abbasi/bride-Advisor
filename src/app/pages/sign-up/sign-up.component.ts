import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms';
import {Router} from '@angular/router'
import {RegisterService} from '../../shared/register/register.service'
import {User} from '../../models/user/user'
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user :User;
  regForm : FormGroup;
  constructor(private _register:RegisterService,
              private _router: Router) { }

  ngOnInit(): void {
    this.regForm = new FormGroup({
      acType : new FormControl(),
      firstName :new FormControl(),
      lastName: new FormControl(),
      email : new FormControl() ,
      password : new FormControl(),

    })
  }
regUser(){
  console.log(this.regForm.value)
  this._register.register(this.regForm.value)
    .subscribe((res)=>{
      
      localStorage.setItem('token',res.token);
      this._router.navigate(['/listing']);
    },(err)=>{
      console.log(err);
    })
}
}
