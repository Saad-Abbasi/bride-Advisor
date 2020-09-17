import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable,throwError} from 'rxjs';
import {retry,catchError} from'rxjs/operators';
import {Listing} from '../../models/listing/listing';
import {Gallery} from '../../models/gallery/gallery';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ListingService {
  apiUrl = environment.api_url; 
  
  constructor(private http:HttpClient) { }
  // http Header Options
  httpOptions={ 
    headers: new HttpHeaders({
      'content-type':'application/json'
    })
  }
  //Api's

  addListing(listing:Listing,id:String): Observable <Listing> {
    console.log(listing)
  
    return this.http.post<Listing>(`${this.apiUrl}/listing/${id}`,JSON.stringify(listing),this.httpOptions,)
     .pipe(
       retry(2),
       catchError(this.handleError)
     ) 
   };

   //get Listing 

   getListing(id:String){
     return this.http.get(`${this.apiUrl}/listing/${id}`)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
   }
   //update listing
   updateListing(listing:Listing,id:String): Observable <Listing> {
    console.log(listing)
  
    return this.http.put<Listing>(`${this.apiUrl}/listing/${id}`,JSON.stringify(listing),this.httpOptions,)
     .pipe(
       retry(2),
       catchError(this.handleError)
     ) 
   };

   //get logo
   getLogo(id:String){
     return this.http.get(`${this.apiUrl}/listing/logo/${id}`)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
   }
   //Getting Gallery images

   getGalleryImages(id:String){
    return this.http.get(`${this.apiUrl}/listing/gallery/${id}`)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
   }
   //deleteing gallery 
   deleteGalleryImage(id:String){
    return this.http.delete(`${this.apiUrl}/listing/gallery/${id}`, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )}
  
  //handling Errors
     handleError(error) {
      let errorMessage = '';
      if(error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      alert(errorMessage);
      return throwError(errorMessage);
   }
}
