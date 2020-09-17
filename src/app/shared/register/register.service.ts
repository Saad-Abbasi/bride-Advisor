import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable,throwError, from} from 'rxjs';
import {retry,catchError} from'rxjs/operators';
import {User} from '../../models/user/user'
import {TokenPayload} from '../../models/token/token-payload';
import {TokenResponse} from '../../models/token/token-response';
import {Router} from '@angular/router'
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private token : string

  apiUrl = environment.api_url;
  //  apiUrl = 'http://localhost:8080';

  constructor(private http:HttpClient,private router:Router) { }
  //http Header Options

  httpOptions={ 
    headers: new HttpHeaders({
      'content-type':'application/json'
    })
  }
//methods



 
register(user:User): Observable <User> {

  return this.http.post<User>(this.apiUrl+'/register',JSON.stringify(user),this.httpOptions,)
   .pipe(
    //  retry(),
     catchError(this.handleError)
   ) 
 };
 //reset user password
 resetPassword(email:any) {

  return this.http.post(this.apiUrl+'/pass/forgot',JSON.stringify(email),this.httpOptions,)
   .pipe(
    //  retry(),
     catchError(this.handleError)
   ) 
 };

 updatePassword(pass:any,email:any) {
   console.log("recived pass " , pass ,email)
  const  data = {
    email:email,
    password :pass
   }
   console.log(data)

  return this.http.post('http://localhost:8080/pass/update',JSON.stringify(data),this.httpOptions,)
   .pipe(
    //  retry(),
     catchError(this.handleError)
   ) 
 };

//handling Errors
   handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    }
    if(error.status == 400){
      errorMessage = "Email already in use";
    }
    if(error.status == 0){
      errorMessage = `Server is not responding \n please try again later`;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    alert(errorMessage);
    return throwError(errorMessage);
 }

}
