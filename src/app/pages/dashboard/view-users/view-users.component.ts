import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements AfterViewInit {

  displayedColumns: string[] = ['name', 'email','edit'];
  dataSource = new MatTableDataSource<listinElements>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
export interface listinElements {
  name: string;
  email: string;
 
  
}

const ELEMENT_DATA: listinElements[] = [
  {name: 'John', email:'abc@gmail.com'},
  {name: 'Sally', email:'abc@gmail.com'},
  {name: 'Saad', email:'abc@gmail.com'}
];

