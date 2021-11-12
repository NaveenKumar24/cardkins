import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PreFillService } from '../pre-fill.service';
import { TokenService } from '../token.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardDetailsComponent} from '../card-details/card-details.component';




@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  dataList  = []; 
  noOfCards:any;
  cardImage:any;
  public myBase64 = ' ';
  matDialogRef: MatDialogRef<CardDetailsComponent>;

  constructor(private prefillService: PreFillService, private sanitizer: DomSanitizer, private TokenService: TokenService,
    private router: Router,  private toast: ToastrService,private matDialog: MatDialog) { }

 

  ngOnInit(): void {
    // debugger;
    this.noOfCards = this.prefillService.getUserWiseData();
    console.log(this.noOfCards);
    if (this.noOfCards == undefined) {
      this.router.navigate(['../userListReport/userStatus']);
    }
    else {
       this.dataList = this.noOfCards.UserCards;
    }

  }

 

  getDetails(item) {
      // debugger;     
      console.log(item);
      let UserProfileId = this.prefillService.getNoOProfileCards();
      console.log(UserProfileId);
      let UserCardId = item.UserCardId;
      console.log(UserCardId);
    
      let noOfProfileCardsResponse = {
        "UserProfileId":UserProfileId,
        "UserCardId":UserCardId
      }
      
      let api = '/Card/get';
      this.TokenService.postdata(this.TokenService.EncryptedData(noOfProfileCardsResponse),api).then(async res => {
        let deceryptedData = await this.TokenService.DecryptedData(res['response']);
        console.log(deceryptedData);
        console.log(deceryptedData.responseValue);
        let response = deceryptedData.responseValue;       
        if (response == null) {
          let ErrorMeaage = deceryptedData.message;
          this.toast.error(ErrorMeaage, 'Error !', {
                  timeOut: 3000,
            });
        }
        else {
          this.prefillService.setUserWiseData(deceryptedData.responseValue);
          this.showPopup();
        }
    });
  }

  showPopup() {
    this.matDialogRef = this.matDialog.open(CardDetailsComponent, {   
      width : 'auto',      
      disableClose: true
    });
  }
}
