import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable,throwError, from} from 'rxjs';
import {retry,catchError} from'rxjs/operators';
import {User} from '../../models/user/user'
import { Router } from '@angular/router';
import {TokenPayload} from '../../models/token/token-payload';
import {TokenResponse} from '../../models/token/token-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private token: string;

  apiUrl = 'http://localhost:8080';

  constructor(private http:HttpClient,private router:Router) { }
  //http Header Options

  httpOptions={ 
    headers: new HttpHeaders({
      'content-type':'application/json'
    })
  }
//methods to handle tokens

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

  login(logindata:any): Observable <User> {
    console.log(logindata)

    return this.http.post<User>(this.apiUrl+'/login',JSON.stringify(logindata),this.httpOptions,)
     .pipe(
       retry(2),
       catchError(this.handleError)
     ) 
   };

   getUser(){
    return this.http.get<User>(this.apiUrl+'/profile')
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
   };

   //method to check login 

   loggedIn(){
     return !!localStorage.getItem('token')
   }

   //geting token

   getToken(){
     return localStorage.getItem('token')
   }
   logout(){
      localStorage.removeItem('token');
      this.router.navigate(['/find'])
   }
  //  getTest(){
  //    this.http.get('https://jsonplaceholder.typicode.com/todos/1')
  //     .subscribe((res)=>{
  //       console.log(res)
  //     })
  //  }
  //  loginAdmin(logindata:any) {
   
  //    return this.http.post<any>('admin/login',JSON.stringify(logindata),this.httpOptions,)
  //     .pipe(
  //       retry(2),
  //       catchError(this.handleError)
  //     ) 
  //   };
  //    //for specific id 
  //    loginId(id): Observable <Login>{
  //      return this.http.get<Login>( 'login'+ id)
  //      .pipe(
  //        retry(1),
  //        catchError(this.handleError)
  //      )};
  //    register(login:any): Observable <Login> {
  //      return this.http.post<Login>('register',JSON.stringify(login),this.httpOptions)
  //      .pipe(
  //        retry(1),
  //        catchError(this.handleError)
  //      )};
  //      updateuser(id:any , Login:any): Observable<Login> {
  //        return this.http.put<Login>('update/'+id,JSON.stringify(Login),this.httpOptions)
  //        .pipe(
  //          retry(1),
  //          catchError(this.handleError)
  //        )};
  //      deleteuser(id): Observable <Login>{
  //        return this.http.delete<Login>(this.apiUrl + '/deleteuser/'+id, this.httpOptions)
  //        .pipe(
  //          retry(1),
  //          catchError(this.handleError)
  //        )}
  //      isLoggedIn(){
  //        return !!localStorage.getItem('token')
  //      }
  
  //methods to save tokens

  // public register(user: TokenPayload): Observable<any> {
  //   return this.request('post', 'register', user);
  // }

  // public login(user: TokenPayload): Observable<any> {
  //   return this.request('post', 'login', user);
  // }

  // public profile(): Observable<any> {
  //   return this.request('get', 'profile');
  // }

  // public logout(): void {
  //   this.token = '';
  //   window.localStorage.removeItem('mean-token');
  //   this.router.navigateByUrl('/');
  // }

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

