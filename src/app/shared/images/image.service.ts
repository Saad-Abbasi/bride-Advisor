import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable,throwError, from} from 'rxjs';
import {catchError,retry} from 'rxjs/operators';
import {Image} from '../../models/image/image'

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  apiUrl = 'http://localhost:8080/listing';
  constructor(private http:HttpClient) { }
  // http Header Options
  httpOptions={ 
    headers: new HttpHeaders({
      'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data' 
    })
  }
  //Api's

//uploading gallery images
uploadGalleryImage(formData:any,id:String) {
  console.log('Service log' + formData)

  return this.http.post(`${this.apiUrl}/gallery/${id}`,formData )
   .pipe(
     retry(3),
     catchError(this.handleError)
   ) 
 };
 getGalleryImages(galleryId:String){
  return this.http.get(`${this.apiUrl}/gallery/${galleryId}`,this.httpOptions).
   pipe(
    retry(1),
    catchError(this.handleError)
   
   )}
   //Delete Gallery image
  
 //uploading profile image
 uploadProfileImage(formData:any,id:String) {
  console.log('Service log' + formData)

  return this.http.post(`${this.apiUrl}/logo/${id}`,formData )
   .pipe(
     retry(3),
     catchError(this.handleError)
   ) 
 };
   //getting logo / profile 
   getLogo(logoId:String){
    return this.http.get(`${this.apiUrl}/${logoId}`,this.httpOptions).
     pipe(
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
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}\n Email or Password Incorrect`;
      }
      alert(errorMessage);
      return throwError(errorMessage);
   }
}
