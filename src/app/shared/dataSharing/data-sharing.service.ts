import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  constructor() { }

  private _listingIDSource = new Subject<string>();
  listingId$ = this._listingIDSource.asObservable();

  sendListingId(id:string){
    this._listingIDSource.next(id);
  }

}
