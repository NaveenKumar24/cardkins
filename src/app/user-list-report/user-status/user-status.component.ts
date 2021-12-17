import { Component, ViewChild, OnInit, AfterViewInit, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../../token.service';
import { ToastrService } from 'ngx-toastr';
import { PreFillService } from '../../pre-fill.service';
import { Router } from '@angular/router';
import { ModalPopupComponent } from '../../shared/modal-popup/modal-popup.component';
// import { PopupComponent } from '../../popup1/popup1.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface StausType {
  Status: boolean;
  Label: string;
}

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.scss']
})
export class UserStatusComponent implements OnInit {

  dataSource: any;
  userProfileId: any; roleId: any;
  isLoading: boolean;
  divContent: boolean;
  matDialogRef: MatDialogRef<ModalPopupComponent>;
  displayedColumns: string[] = ['username','MobileNumber', 'Email','NoOfProfileCards', 'Status'];

  status: StausType[] = [
    { Status: true, Label: 'Active' },
    { Status: false, Label: 'Inactive' }
  ];


  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private http: HttpClient, private TokenService: TokenService, private toast: ToastrService,
    private prefillService: PreFillService, private router: Router,  private matDialog: MatDialog) { }


  ngOnInit() {
    // this.getUserStatus();
    this.isLoading = true;
    this.divContent = false;
    if (this.prefillService.getUserId() && this.prefillService.getRoleId()) {
      console.log("User Profile Id is" + " " + this.prefillService.getUserId());
      console.log("Role Id is " + " " + this.prefillService.getRoleId());
      this.userProfileId = this.prefillService.getUserId();
      this.roleId = this.prefillService.getRoleId();
      this.getUserStatus();
    }
    else if (this.userProfileId == undefined && this.roleId == undefined) {
      this.router.navigate(['login']);
    }

  }

  getUserStatus() {
    //  debugger;
    let UserStatusReport = {
      "LoginUserProfileId": this.userProfileId,
      "RoleId": this.roleId
    };
    // let UserStatusReport = {
    //   "LoginUserProfileId": 114,
    //   "RoleId": 2
    // };
    console.log(UserStatusReport);
    let api = 'WebAdminPanel/UserStatusReport';
    this.TokenService.postdata(this.TokenService.EncryptedData(UserStatusReport), api).then(async res => {
      let deceryptedData = await this.TokenService.DecryptedData(res['response']);
      console.log(deceryptedData);
      let TableData = deceryptedData.responseValue.UserStatusReportData;
      // console.log(TableData);
      this.isLoading = false;
      this.divContent = true;
      this.dataSource = new MatTableDataSource(TableData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }).catch(err => {
      JSON.parse(JSON.stringify(err))
      console.log(err.message);
    })
  }

  onChange(value: any, element: any) {
    // console.log(`${JSON.stringify(element)} - Row Click Event from Demo`);
    // console.log(`${JSON.stringify(element.UserProfileId)}`);
    let userProfileId = JSON.stringify(element.UserProfileId)
    console.log("selected value", value);

    let Status = {
      "LoginUserProfileId": this.userProfileId,
      "RoleId": this.roleId,
      "UserProfileId": userProfileId,
      "Status": value
    }
    console.log(Status);
    let api = 'WebAdminPanel/editUserStatusReport';
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

  
    noOfArchivedCards(element) {
    console.log(element);
    let UserId = element.UserProfileId;

    let noOfArchivedCardsResponse = {
      "LoginUserProfileId": this.userProfileId,
       "RoleId": this.roleId,
       "UserProfileId":UserId,
       "Flag":"A"
     }

    //  let noOfArchivedCardsResponse = {
    //   "LoginUserProfileId": 114,
    //    "RoleId": 2,
    //    "UserProfileId":UserId,
    //    "Flag":"A"
    //  }

     let api = '/WebAdminPanel/getUserStatusReport';
    this.TokenService.postdata(this.TokenService.EncryptedData(noOfArchivedCardsResponse),api).then(async res => {
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
          this.noOfDefaultCards(element);
          this.showPopup();
        }
        
    });
  }

  noOfProfileCards(element) {
    // debugger;
    console.log(element);
    let UserId = element.UserProfileId;
    this.prefillService.setNoOProfileCards(UserId);

    let noOfProfileCardsResponse = {
      "UserProfileId":UserId,
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
          this.router.navigate(['../cards']);
        }
    });
  }

  noOfDefaultCards(element) {
    // debugger;
    console.log(element);
    let UserId = element.UserProfileId;

    let noOfProfileCardsResponse = {
      "LoginUserProfileId": this.userProfileId,
       "RoleId": this.roleId,
       "UserProfileId":UserId,
       "Flag":"D"
     }

    //  let noOfProfileCardsResponse = {
    //   "LoginUserProfileId": 114,
    //    "RoleId": 2,
    //    "UserProfileId":UserId,
    //    "Flag":"N"
    //  }

     let api = '/WebAdminPanel/getUserStatusReport';
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
          // this.showPopup();
        }
    });
  }

  showPopup() {
    this.matDialogRef = this.matDialog.open(ModalPopupComponent, {   
      width : 'auto',      
      disableClose: true
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
