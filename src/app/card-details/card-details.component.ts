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
  dataList:any=[];
  name:any; 
  title:any;
  companyName:any;
  officeMobileNo:any;
  primaryEmail:any;
  industry:any;
  service:any;
  image:any;
  images:any;
  constructor(private prefillService: PreFillService,public dialogRef: MatDialogRef<CardDetailsComponent>,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    debugger;
    let data = this.prefillService.getUserWiseData();
    console.log(data);
    if(data.UserCards) {
      this.UserCards = data.UserCards;
      this.dataList = this.UserCards;
      console.log(data);
      console.log(data.LastName);
      console.log("The Data List is");

      console.log(this.dataList);

      console.log(this.UserCards[0].CardFirstName);
      if (this.dataList[0].CardImages) {
        this.images = this.dataList[0].CardImages;
      }
      // this.image = this.dataList[0].CardImages;
      this.name = this.dataList[0].Salutation + " " +  this.dataList[0].CardFirstName + " " + this.dataList[0].CardMiddleName + " " + this.dataList[0]. CardLastName;
      this.title = this.dataList[0].Title;
      this.companyName = this.dataList[0].CompanyName;
      this.officeMobileNo = this.dataList[0].OfficeMobileNo;
      this.primaryEmail = this.dataList[0].PrimaryEmail;
      this.industry = this.dataList[0].Industry;
      this.service = this.dataList[0].Service;
    }
    else if(data) {
      this.dataList = data;
      console.log(this.dataList);
      if (data.CardImages) {
        this.images = data.CardImages;
      }
      else if (data.BussinessCardImages) {
      this.images = data.BussinessCardImages;
      }
      this.name = data.Salutation + " " +  data.FirstName + " " + data.MiddleName + " " + data.LastName;
      this.title = data.Title;
      this.companyName = data.CompanyName;
      this.officeMobileNo = data.OfficeMobileNumber;
      this.primaryEmail = data.PrimaryEmail;
      this.industry = data.Industry;
      this.service = data.Service;
    }
    // console.log(data.UserCards);
   
  }

  imageShow() {
    // debugger;
    let data = this.prefillService.getUserWiseData();
    console.log(data);
    console.log(data.UserCards);
    this.UserCards = data.UserCards;
    if(data.UserCards) {
      this.UserCards = data.UserCards;
      this.dataList = this.UserCards;
      console.log(this.dataList);
    }
    else if(data) {
      this.dataList = data;
      console.log(this.dataList);
    }

    // for (var i = index; i < this.dataList.length; i++) {
    //   this.cardImage = this.dataList[i].BussinessCardImages;
    //   return this.sanitizer.bypassSecurityTrustResourceUrl(this.cardImage);        
    // }
  }

  closeDialogue() {
    this.dialogRef.close();

  }

}
