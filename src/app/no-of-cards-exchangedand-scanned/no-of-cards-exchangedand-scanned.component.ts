
import { Component, ViewChild, OnInit, AfterViewInit, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PreFillService } from '../pre-fill.service';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../token.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardDetailsComponent} from '../card-details/card-details.component';

interface StausType {
  Status: boolean;
  Label: string;
}


@Component({
  selector: 'app-no-of-cards-exchangedand-scanned',
  templateUrl: './no-of-cards-exchangedand-scanned.component.html',
  styleUrls: ['./no-of-cards-exchangedand-scanned.component.scss']
})
export class NoOfCardsExchangedandScannedComponent implements OnInit {

  status: StausType[] = [
    { Status: true, Label: 'Active' },
    { Status: false, Label: 'Inactive' }
  ];
  noOfCards:any;
  dataList= [];
  dataSource:any;
  LoginProfileId:any;
  roleId:any;
  matDialogRef: MatDialogRef<CardDetailsComponent>;
  displayedColumns: string[] = ['CardImages', 'Status'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private http: HttpClient,private sanitizer: DomSanitizer,private prefillService: PreFillService,private router: Router,
    private TokenService: TokenService,
    private toast: ToastrService,private matDialog: MatDialog) { }

  ngOnInit(): void {
    // debugger;
    console.log(this.status)
    this.noOfCards = this.prefillService.getUserWiseData();
    let url = this.prefillService.getHref();
    console.log(url);
    var result = /[^/]*$/.exec(url)[0];
    console.log(result);
    console.log(this.noOfCards);
    let TableData = this.noOfCards;
    console.log('Table Data is');
    console.log(TableData);
    this.dataSource = new MatTableDataSource(TableData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.noOfCards == undefined && result == undefined) {
      this.router.navigate(['../userListReport/countOfScannedCards']);
    }

    if (this.noOfCards == undefined && result == 'countOfScannedCards') {
      this.router.navigate(['../userListReport/countOfScannedCards']);
    }    
    
    else {
       this.dataList = this.noOfCards;
    }
  }

  userListPage() {
    let url = this.prefillService.getHref();
    console.log(url);
    var result = /[^/]*$/.exec(url)[0];
    console.log(result);

    if(result == 'countOfScannedCards' ) {
      this.router.navigate(['../userListReport/countOfScannedCards']);
    }
  }

  getDetails(item) {
    debugger;     
    console.log(item);
    this.prefillService.setUserWiseData(item);
    this.showPopup();
}

onChange(value: any, element: any) {
  console.log(value);
  console.log(element);
  let userProfileId = JSON.stringify(element.UserProfileId);
  let cardId = JSON.stringify(element.UserCardId);
  let status = JSON.stringify(element.Active);
  this.LoginProfileId = this.prefillService.getUserId();
  this.roleId = this.prefillService.getRoleId();
  console.log("selected value", value);

  let Status = {
    "LoginUserProfileId": this.LoginProfileId,
    "RoleId": this.roleId,
     "UserProfileId":userProfileId,
    "CardID":cardId,
    "Status":status,
    "Flag":"E"
  }

  // let Status = {
  //   "LoginUserProfileId": 114,
  //   "RoleId": 2,
  //   "UserProfileId":userProfileId,
  //   "CardID":cardId,
  //   "Status":status,
  //   "Flag":"E"
  //  }
  console.log(Status);
  let api = 'WebAdminPanel/editExchangedAndScannedCardReport';
  this.TokenService.postdata(this.TokenService.EncryptedData(Status), api).then(async res => {
    let deceryptedData = await this.TokenService.DecryptedData(res['response']);
    console.log(deceryptedData);
    console.log(deceryptedData.message);
    this.toast.success(deceryptedData.message, ' ', {
      timeOut: 3000,
    });
  }).catch(err => {
    JSON.parse(JSON.stringify(err))
    console.log(err.message);
  })
}

showPopup() {
  this.matDialogRef = this.matDialog.open(CardDetailsComponent, {   
    width : 'auto',      
    disableClose: true
  });
}

}
