import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Review } from '../../models/reviews/review'

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  apiUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }
  httpOptions={ 
    headers: new HttpHeaders({
      'content-type':'application/json'
    })
  }

saveReview(review: Review,id:string): Observable<Review> {
    console.log(review)
    return this.http.post<Review>(`${this.apiUrl}/listing/review/${id}`, JSON.stringify(review), this.httpOptions,)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  };


//getting Reviews

getReviews(listingId:String) {
  
  return this.http.get(`${this.apiUrl}/listing/review/${listingId}`, this.httpOptions,)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
};

  //handling Errors
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
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
