import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-view-reviews',
  templateUrl: './view-reviews.component.html',
  styleUrls: ['./view-reviews.component.css']
})
export class ViewReviewsComponent implements AfterViewInit {

  displayedColumns: string[] = ['name', 'email', 'message', 'status','edit'];
  dataSource = new MatTableDataSource<listinElements>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
export interface listinElements {
  name: string;
  email: string;
  message: string;
  status: string;
  
}

const ELEMENT_DATA: listinElements[] = [
  {name: 'Wedding Lake como', email:'abc@gmail.com', message:"It was a pleasure working with Sally whilst planning our wedding. The planning and organisation shown throughout was faultless. No request or change to the plan was too much and was greeted with great enthusiasm. Sally's in depth knowledge of the local contacts and suppliers helped give us a bespoke wedding that we will never forget. I would highly recommend using WeddingBox, the service and professionalism were exceptional – thanks Sally!',",status:'live'},
  {name: 'Wedding Lake como', email:'abc@gmail.com', message:"It was a pleasure working with Sally whilst planning our wedding. The planning and organisation shown throughout was faultless. No request or change to the plan was too much and was greeted with great enthusiasm. Sally's in depth knowledge of the local contacts and suppliers helped give us a bespoke wedding that we will never forget. I would highly recommend using WeddingBox, the service and professionalism were exceptional – thanks Sally!',",status:'live'},
  {name: 'Wedding Lake como', email:'abc@gmail.com', message:"It was a pleasure working with Sally whilst planning our wedding. The planning and organisation shown throughout was faultless. No request or change to the plan was too much and was greeted with great enthusiasm. Sally's in depth knowledge of the local contacts and suppliers helped give us a bespoke wedding that we will never forget. I would highly recommend using WeddingBox, the service and professionalism were exceptional – thanks Sally!',",status:'live'},
  {name: 'Wedding Lake como', email:'abc@gmail.com', message:"It was a pleasure working with Sally whilst planning our wedding. The planning and organisation shown throughout was faultless. No request or change to the plan was too much and was greeted with great enthusiasm. Sally's in depth knowledge of the local contacts and suppliers helped give us a bespoke wedding that we will never forget. I would highly recommend using WeddingBox, the service and professionalism were exceptional – thanks Sally!',",status:'live'},
  {name: 'Wedding Lake como', email:'abc@gmail.com', message:"It was a pleasure working with Sally whilst planning our wedding. The planning and organisation shown throughout was faultless. No request or change to the plan was too much and was greeted with great enthusiasm. Sally's in depth knowledge of the local contacts and suppliers helped give us a bespoke wedding that we will never forget. I would highly recommend using WeddingBox, the service and professionalism were exceptional – thanks Sally!',",status:'live'},
  {name: 'Wedding Lake como', email:'abc@gmail.com', message:"It was a pleasure working with Sally whilst planning our wedding. The planning and organisation shown throughout was faultless. No request or change to the plan was too much and was greeted with great enthusiasm. Sally's in depth knowledge of the local contacts and suppliers helped give us a bespoke wedding that we will never forget. I would highly recommend using WeddingBox, the service and professionalism were exceptional – thanks Sally!',",status:'live'},
  {name: 'Wedding Lake como', email:'abc@gmail.com', message:"It was a pleasure working with Sally whilst planning our wedding. The planning and organisation shown throughout was faultless. No request or change to the plan was too much and was greeted with great enthusiasm. Sally's in depth knowledge of the local contacts and suppliers helped give us a bespoke wedding that we will never forget. I would highly recommend using WeddingBox, the service and professionalism were exceptional – thanks Sally!',",status:'live'},
  {name: 'Wedding Lake como', email:'abc@gmail.com', message:"It was a pleasure working with Sally whilst planning our wedding. The planning and organisation shown throughout was faultless. No request or change to the plan was too much and was greeted with great enthusiasm. Sally's in depth knowledge of the local contacts and suppliers helped give us a bespoke wedding that we will never forget. I would highly recommend using WeddingBox, the service and professionalism were exceptional – thanks Sally!',",status:'live'},
  {name: 'Wedding Lake como', email:'abc@gmail.com', message:"It was a pleasure working with Sally whilst planning our wedding. The planning and organisation shown throughout was faultless. No request or change to the plan was too much and was greeted with great enthusiasm. Sally's in depth knowledge of the local contacts and suppliers helped give us a bespoke wedding that we will never forget. I would highly recommend using WeddingBox, the service and professionalism were exceptional – thanks Sally!',",status:'live'},
  {name: 'Wedding Lake como', email:'abc@gmail.com', message:"It was a pleasure working with Sally whilst planning our wedding. The planning and organisation shown throughout was faultless. No request or change to the plan was too much and was greeted with great enthusiasm. Sally's in depth knowledge of the local contacts and suppliers helped give us a bespoke wedding that we will never forget. I would highly recommend using WeddingBox, the service and professionalism were exceptional – thanks Sally!',",status:'live'},
  {name: 'Wedding Lake como', email:'abc@gmail.com', message:"It was a pleasure working with Sally whilst planning our wedding. The planning and organisation shown throughout was faultless. No request or change to the plan was too much and was greeted with great enthusiasm. Sally's in depth knowledge of the local contacts and suppliers helped give us a bespoke wedding that we will never forget. I would highly recommend using WeddingBox, the service and professionalism were exceptional – thanks Sally!',",status:'live'},
];
