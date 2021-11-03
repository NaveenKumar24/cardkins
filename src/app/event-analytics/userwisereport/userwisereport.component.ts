import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../../token.service';
import { PreFillService } from '../../pre-fill.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-userwisereport',
  templateUrl: './userwisereport.component.html',
  styleUrls: ['./userwisereport.component.scss']
})
export class UserwisereportComponent implements OnInit {

  displayedColumns: string[] = ['UserName', 'NoOfEvents'];
  dataSource: any;
  userProfileId: any; roleId: any;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private http: HttpClient, private TokenService: TokenService, private prefillService: PreFillService, private router: Router) { }

  ngOnInit() {
    debugger;
    if (this.prefillService.getUserId() && this.prefillService.getRoleId()) {
      console.log("User Profile Id is" + " " + this.prefillService.getUserId());
      console.log("Role Id is " + " " + this.prefillService.getRoleId());
      this.userProfileId = this.prefillService.getUserId();
      this.roleId = this.prefillService.getRoleId();
      this.getUserWiseReport();
    }
    else if (this.userProfileId == undefined && this.roleId == undefined) {
      this.router.navigate(['login']);
    }

  }
  selectedRow(row) {
    console.log('selectedRow', row)
  }

  getUserWiseReport() {
    let UserWiseReport = {
      "LoginUserProfileId": this.userProfileId,
      "RoleId": this.roleId,
    };
    let api = 'WebAdminPanel/UserWiseReport';
    this.TokenService.postdata(this.TokenService.EncryptedData(UserWiseReport), api).then(async res => {
      let deceryptedData = await this.TokenService.DecryptedData(res['response']);
      console.log(deceryptedData);
      let TableData = deceryptedData.responseValue.EventWiseUserDataReport;
      // console.log("Table Data Length is" + " " + TableData.length);
      this.dataSource = new MatTableDataSource(TableData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }).catch(err => {
      JSON.parse(JSON.stringify(err))
      console.log(err.message);
      // this.router.navigate(['login']);
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
