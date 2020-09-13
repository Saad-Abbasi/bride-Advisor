import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {ImageService} from '../../../shared/images/image.service';
import {LoginService} from '../../../shared/login/login.service';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-profile-img',
  templateUrl: './profile-img.component.html',
  styleUrls: ['./profile-img.component.css']
})
export class ProfileImgComponent implements OnInit {
  logoId :any;
  profileImageForm:FormGroup;
  listingId:any;
  userId:any;
  constructor(private _imageService:ImageService,
              private http: HttpClient,
              private _loginService:LoginService,
              public fb:FormBuilder) { 
                this.profileImageForm = this.fb.group({
                  title: [''],
                  logo: [null],
                  description:['']
                })
              }

  ngOnInit(): void {
  //getting user id
    this.getUser()
  }
  selectedFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.profileImageForm.patchValue({
      logo: file
    });
    this.profileImageForm.get('logo').updateValueAndValidity()
  }

  getUser(){
    this._loginService.getUser().
      subscribe((user)=>{
        this.userId = user._id;
        console.log(this.userId)
       this.listingId = user.listing[0];
      //  console.log(this.listingId);
      //   this.getProfile(this.listingId);
      })
  }
  saveProfile(){//where is the api call 
    
      var formData: any = new FormData();
      formData.append("title", this.profileImageForm.get('title').value);
      formData.append("profileImage", this.profileImageForm.get('logo').value);
      formData.append("description", this.profileImageForm.get('description').value);
      
      this._imageService.uploadProfileImage(formData,this.listingId). // here is service call and
        subscribe((result)=>{
          console.log(result)
          location.reload()
        },(err)=>{
          console.log(err)
        })

      
    }
  

  }
 

