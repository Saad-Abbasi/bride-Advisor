import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import {Observable,throwError} from 'rxjs';
import {retry,catchError} from'rxjs/operators';
import { Params } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  apiUrl = 'http://localhost:8080/listing';
  
  constructor(private http: HttpClient) { }
  httpOptions={ 
    headers: new HttpHeaders({
      'content-type':'application/json'
    })
  }
  // findListing(category:string,address:string){
  //   // let params = new HttpParams();

  //   params = params.append('category', category);
  //   params = params.append('address', address);
  //   console.log(params)
  //   // let params = new HttpParams().set("category",category).set("address", address);
  //   this.http.get(`${this.apiUrl}/find/listing`, {params: params}); 
  //   return this.http.get(`${this.apiUrl}/find/listing`,{params:params}
  //    .pipe(
  //      retry(2),
  //      catchError(this.handleError)
  //    )
  //  }

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
