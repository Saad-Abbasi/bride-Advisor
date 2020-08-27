import { Component, OnInit, Inject } from '@angular/core';
// import {ViewDialogInteractionService} from '../../../shared/component-interaction/view-dialog-interaction.service'
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-image-dialoge',
  templateUrl: './image-dialoge.component.html',
  styleUrls: ['./image-dialoge.component.css']
})
export class ImageDialogeComponent implements OnInit {

  imageUrl:String
  // constructor(private imageService:ViewDialogInteractionService,
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  //   this.imageService.imageUrl$
  //   .subscribe(imageUrl=>{
  //     this.imageUrl= imageUrl;
  //   })
  }

}
