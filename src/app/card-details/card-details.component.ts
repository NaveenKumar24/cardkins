import { Component, OnInit } from '@angular/core';
import { PreFillService } from '../pre-fill.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {

  UserCards:any;
  cardImage:any;
  dataList=[]; 

  constructor(private prefillService: PreFillService,public dialogRef: MatDialogRef<CardDetailsComponent>,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // debugger;
    let data = this.prefillService.getUserWiseData();
    console.log(data);
    console.log(data.UserCards);
    this.UserCards = data.UserCards;
    this.dataList = this.UserCards;
    console.log(this.dataList);
  }

  imageShow(index) {
    // debugger;
    let data = this.prefillService.getUserWiseData();
    console.log(data);
    console.log(data.UserCards);
    this.UserCards = data.UserCards;
    for (var i = index; i < this.UserCards.length; i++) {
      this.cardImage = this.UserCards[i].CardImages;
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.cardImage);        
    }
  }

  closeDialogue() {
    this.dialogRef.close();

  }

}
