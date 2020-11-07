import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {HttpClient,HttpParams} from '@angular/common/http';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { environment } from '../../../.././../environments/environment';
import {CategoryUpdateService} from '../../../../shared/category/category-update.service';
import {ListingService} from '../../../../shared/listing/listing.service';
import {Listing} from '../../../../models/listing/listing'

@Component({
  selector: 'app-edit-listing-dialog',
  templateUrl: './edit-listing-dialog.component.html',
  styleUrls: ['./edit-listing-dialog.component.css']
})
export class EditListingDialogComponent implements OnInit {

listingId:string;

  listingEditForm = this.fb.group({
    business: [''],
    category: [''],
    listingStatus: [],
    paymentStatus: [],
    email:['']
  });

  constructor(private fb: FormBuilder,
               private http:HttpClient,
               private _listingService:ListingService,
              public dialogRef: MatDialogRef<EditListingDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                 console.log(this.data)
                //  this.searchListing(this.data);
                 
                }
  
  ngOnInit(): void {
    this.searchListing(this.data);
  }
  //search listing 
  searchListing(email:string){
    console.log(email)
    let params = new HttpParams();
    params = params.append('email', email);
    this.http.get(`${environment.api_url}/find/listing/review/data`, ({ params: params }))
      .subscribe((listingData:any) => {
        console.log(listingData)
        this.listingId =listingData._id;
        // this.listingEditForm.get('business').setValue(data.business);
        // this.listingEditForm.get('category').setValue(data.category);
        // this.listingEditForm.get('listingStatus').setValue(data.listingStatus);
        // this.listingEditForm.get('paymentStatus').setValue(data.paymentStatus);
        this.editProfile(listingData);
      },
        err => console.log(err))

  }
  editProfile(listingData:Listing){
    this.listingEditForm.patchValue({
      business:listingData.business,
      category:listingData.category,
      listingStatus:listingData.listingStatus,
      paymentStatus:listingData.paymentStatus,
      email:listingData.email,
      listingType:listingData.listingType,
      tradingName:listingData.tradingName,
      phone:listingData.phone,
      website:listingData.website,
      address:listingData.address,
      fullPlaning:listingData.fullPlaning,
      partPlaning:listingData.partPlaning,
      coordinator:listingData.coordinator,
      tagline:listingData.tagLine,
      description:listingData.description,
      fLink:listingData.fLink,
      tLink:listingData.tLink,
      gLink:listingData.gLink,
      iLink:listingData.iLink,
      pLink:listingData.pLink,
      yVideoLink:listingData.yVideoLink,
      vVideoLink:listingData.vVideoLink,
      vatNumber:listingData.vatNumber
     
    })
  }

  savaListing(){
    console.log('values berfor edit update' , this.listingEditForm.value)
    this._listingService.updateListing(this.listingEditForm.value,this.listingId).
    subscribe((result)=>{
      console.log(result)
      location.reload();
    },(err)=>{
      console.log(err)
    })
  }

}
