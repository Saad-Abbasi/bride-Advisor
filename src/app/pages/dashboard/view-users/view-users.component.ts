import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {LoginService} from '../../../shared/login/login.service';
import {RegisterService} from '../../../shared/register/register.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../dialogues/add-user-dialog/add-user-dialog.component';

interface Iadmins {
  firstName: string;
  lastName:string,
  email: string;
}


@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})

export class ViewUsersComponent implements AfterViewInit,OnInit {
  admins:Iadmins[];

  displayedColumns: string[] = ['name', 'email','edit'];

  dataSource : MatTableDataSource<Iadmins>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    
  }
  constructor(private userService:LoginService,
              private _registerService:RegisterService,
              private _dialogue:MatDialog){
  }
  ngOnInit():void{
    this.userService.getAllAdmins().subscribe((result:any)=>{
      this.admins = result;
      console.log('Got this data',this.admins)
      this.dataSource = new MatTableDataSource<Iadmins>(this.admins);
      this.dataSource.paginator = this.paginator;
    })
  } 
  //Delete user 
  deleteUser(userId:string,name:string){
    if(confirm('Are you sure to delete '+ name + ' ?')){
      this._registerService.deleteUser(userId).subscribe(result=>{
        location.reload()
        console.log('USer deleted',result)
      },(err)=>{
        console.log(err)
      })
    }
    
  }

  //Ad New User admin dialog 
  addNewUser(){
    
      const dialogRef = this._dialogue.open(AddUserDialogComponent, {
        maxWidth: "700px",
        
      });
  
      dialogRef.afterClosed().subscribe(dialogResult => {
          location.reload()
        })
        
      
  
  }

}





