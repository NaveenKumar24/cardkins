import { Component, ViewChild, OnInit, AfterViewInit, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../../token.service';
import { ToastrService } from 'ngx-toastr';
import { PreFillService } from '../../pre-fill.service';
import { Router } from '@angular/router';

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
  displayedColumns: string[] = ['username', 'Status'];
  status: StausType[] = [
    { Status: true, Label: 'Active' },
    { Status: false, Label: 'Inactive' }
  ];


  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private http: HttpClient, private TokenService: TokenService, private toast: ToastrService,
    private prefillService: PreFillService, private router: Router) { }


  ngOnInit() {
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
    console.log(UserStatusReport);
    let api = 'WebAdminPanel/UserStatusReport';
    this.TokenService.postdata(this.TokenService.EncryptedData(UserStatusReport), api).then(async res => {
      let deceryptedData = await this.TokenService.DecryptedData(res['response']);
      console.log(deceryptedData);
      let TableData = deceryptedData.responseValue.UserStatusReportData;
      // console.log(TableData);
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



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
