import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot,Router, ActivatedRoute } from '@angular/router';
import { forkJoin ,Observable,throwError} from 'rxjs';
import { map } from 'rxjs/operators';
import {Listing} from '../../models/listing/listing';
import { ListingService } from '../listing/listing.service';
import {ImageService} from '../images/image.service'

@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<Listing> {
listingId: string;
  constructor(
              private _listingService:ListingService,
              private _galleryService:ImageService) {
                // this._dataSharingService.listingId$.subscribe(result=>{
                //   this.listingId = result;
                // });
                
               }
               
               resolve(route: ActivatedRouteSnapshot): Observable<any>  {
                this.listingId = route.paramMap.get('id');
                return forkJoin([
                        this._listingService.getListing(this.listingId),
                        this._galleryService.getGalleryImages(this.listingId),
                     
                ]).pipe(map((result:any) => {
                      
                    return {
                        listingData:   result[0],
                        galleryData: result[1],  
                    };
                }));
            };
//   resolve(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<any>|Promise<any>|any {

//     this._dataSharingService.listingId$.subscribe(result =>{
//       this.listingId = result;
//       console.log('Got listing id in resolver', this.listingId)
//   },(err)=>{
//         console.log('Not found listing ID')
//   })
//     console.log('come in resolver')

//  return this._listingService.getListing(this.listingId);
//   }
}
