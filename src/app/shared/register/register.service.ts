import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable,throwError, from} from 'rxjs';
import {retry,catchError} from'rxjs/operators';
import {User} from '../../models/user/user'
import {TokenPayload} from '../../models/token/token-payload';
import {TokenResponse} from '../../models/token/token-response';
import {Router} from '@angular/router'
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private token : string
   apiUrl = 'http://localhost:8080';

  constructor(private http:HttpClient,private router:Router) { }
  //http Header Options

  httpOptions={ 
    headers: new HttpHeaders({
      'content-type':'application/json'
    })
  }
//methods


// private saveToken(token: string): void {
//   localStorage.setItem('mean-token', token);
//   this.token = token;
// }

// private getToken(): string {
//   if (!this.token) {
//     this.token = localStorage.getItem('mean-token');
//   }
//   return this.token;
// }

// public getUserDetails(): User {
//   const token = this.getToken();
//   let payload;
//   if (token) {
//     payload = token.split('.')[1];
//     payload = window.atob(payload);
//     return JSON.parse(payload);
//   } else {
//     return null;
//   }
// }

// public isLoggedIn(): boolean {
//   const user = this.getUserDetails();
//   if (user) {
//     return user.exp > Date.now() / 1000;
//   } else {
//     return false;
//   }
// }

 
register(user:User): Observable <User> {
  

  return this.http.post<User>(this.apiUrl+'/register',JSON.stringify(user),this.httpOptions,)
   .pipe(
     retry(2),
     catchError(this.handleError)
   ) 
 };

//handling Errors
   handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}\n Email or Password Incorrect`;
    }
    alert(errorMessage);
    return throwError(errorMessage);
 }

}
