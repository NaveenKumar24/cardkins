import { Component, ViewChild, OnInit, AfterViewInit, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../../token.service';
import { PreFillService } from '../../pre-fill.service';
import { Router } from '@angular/router';
import { PopupComponent } from '../../popup/popup.component';


import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-users-wise-meta-tags-report',
  templateUrl: './users-wise-meta-tags-report.component.html',
  styleUrls: ['./users-wise-meta-tags-report.component.scss']
})
export class UsersWiseMetaTagsReportComponent implements OnInit {
  dataSource: any;
  userProfileId: any; roleId: any;
  displayedColumns: string[] = ['username','MobileNumber', 'Email', 'NoOfScannedMetaTags','NoOfExchangedMetaTags'];
  matDialogRef: MatDialogRef<PopupComponent>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  // matDialog: any;

  constructor(private http: HttpClient, private TokenService: TokenService, private prefillService: PreFillService,
    private router: Router, private matDialog: MatDialog) { }

  ngOnInit() {
      // this.getUserWiseMetaTagsReports();

    if (this.prefillService.getUserId() && this.prefillService.getRoleId()) {
      console.log("User Profile Id is" + " " + this.prefillService.getUserId());
      console.log("Role Id is " + " " + this.prefillService.getRoleId());
      this.userProfileId = this.prefillService.getUserId();
      this.roleId = this.prefillService.getRoleId();
      this.getUserWiseMetaTagsReports();
    }
    else if (this.userProfileId == undefined && this.roleId == undefined) {
      this.router.navigate(['login']);
    }

  }


  getUserWiseMetaTagsReports() {
    let UserWiseMetaTagsReport = {
      "LoginUserProfileId":this.userProfileId,
      "RoleId": this.roleId
    };
    // let UserWiseMetaTagsReport = {
    //   "LoginUserProfileId": this.userProfileId,
    //   "RoleId": this.roleId
    // };
    let api = 'WebAdminPanel/UserWiseMetaTagsReport';
    this.TokenService.postdata(this.TokenService.EncryptedData(UserWiseMetaTagsReport), api).then(async res => {
      let deceryptedData = await this.TokenService.DecryptedData(res['response']);
      console.log(deceryptedData);
      let TableData = deceryptedData.responseValue.UserWiseMetaTagsDataReport;
      // console.log("Table Data Length is" + " " + TableData.length);
      this.dataSource = new MatTableDataSource(TableData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }).catch(err => {
      JSON.parse(JSON.stringify(err))
      console.log(err.message);
    })
  }



  noOfScannedMetaTags(element) {
    debugger;
    console.log(element);
    let UserId = element.UserProfileId;

    let noOfScannedMetaTagsResponse = {
      "LoginUserProfileId": this.userProfileId,
       "RoleId": 2,
       "UserProfileId":UserId,
       "Flag":"S"
     }

     let api = '/WebAdminPanel/getUserWiseMetaTagsReport';
    this.TokenService.postdata(this.TokenService.EncryptedData(noOfScannedMetaTagsResponse),api).then(async res => {
        let deceryptedData = await this.TokenService.DecryptedData(res['response']);
        console.log(deceryptedData);
        console.log(deceryptedData.responseValue);
        this.prefillService.setUserWiseData(deceryptedData.responseValue);
        this.showPopup();
        // this.matDialogRef = this.matDialog.open(PopupComponent, {         
        //   disableClose: true
        // });
    });
  }

  NoOfExchangedMetaTags(element) {
    console.log(element);
    let UserId = element.UserProfileId;

    let noOfScannedMetaTagsResponse = {
      "LoginUserProfileId":this.userProfileId,
       "RoleId": this.roleId,
       "UserProfileId":UserId,
       "Flag":"E"
     }

     let api = '/WebAdminPanel/getUserWiseMetaTagsReport';
    this.TokenService.postdata(this.TokenService.EncryptedData(noOfScannedMetaTagsResponse),api).then(async res => {
        let deceryptedData = await this.TokenService.DecryptedData(res['response']);
        console.log(deceryptedData);
        console.log(deceryptedData.responseValue);
        this.prefillService.setUserWiseData(deceryptedData.responseValue);
       this.showPopup();
    });
  }

  showPopup() {
    this.matDialogRef = this.matDialog.open(PopupComponent, {   
      width : '600px',      
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

