import {AfterViewInit, Component,  OnInit,  ViewChild, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ListingService} from '../../../../shared/listing/listing.service';
import {CategoryUpdateService} from '../../../../shared/category/category-update.service'
import { EditListingDialogComponent } from '../../dialogues/edit-listing-dialog/edit-listing-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../dialogues/confirm-dialog/confirm-dialog.component';

export interface listinElements {
  business: string;
  category: string;
  createdAt?: string;
  status?: string;
  paymentStatus?:string;
}

@Component({
  selector: 'app-view-listings',
  templateUrl: './view-listings.component.html',
  styleUrls: ['./view-listings.component.css']
})
export class ViewListingsComponent implements OnInit {
  dataSource = new MatTableDataSource();
  confirmResult: string = '';
  displayedColumns: string[] = ['business', 'category', 'createdAt', 'status','paymentStatus','edit','delete'];
  
  constructor(private listing: ListingService,
              public dialog: MatDialog,
              private getCategory:CategoryUpdateService){

  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {

  this.dataSource.paginator = this.paginator;
  
  }
ngOnInit(){
  this.dataSource = new MatTableDataSource(this.getListing());
  this.dataSource.paginator = this.paginator;
    
}
getListing():any{
  this.listing.getAllListing().subscribe((data:any)=>{
    
    this.getCategory.getCategory(data); //updating category with value
   
    this.dataSource.data = data;
    return data;
  },(error)=>{
    console.log(error);
    
  })

}
//Edit listing 
editListing(listingEmail){
 this. openDialog(listingEmail);
  console.log(listingEmail)
}
openDialog(listingEmail) {
  const dialogRef = this.dialog.open(EditListingDialogComponent, {
    width: '400px',
    // height: '400px',
    data:listingEmail
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(result)
  });
}

//Delete listing 
deleteListing(listingId){
  const message = `Are you sure you want to delete?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "500px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.confirmResult = dialogResult;
      if(this.confirmResult =='true'){
        this.listing.deleteListing(listingId).subscribe((result:any)=>{
        alert('Deleted '+ result.business)
        location.reload()
      })
      }
    });

}

}



