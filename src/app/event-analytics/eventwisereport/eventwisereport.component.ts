import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from '../../token.service';
import { PreFillService } from '../../pre-fill.service';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';



@Component({
  selector: 'app-eventwisereport',
  templateUrl: './eventwisereport.component.html',
  styleUrls: ['./eventwisereport.component.scss']
})
export class EventwisereportComponent implements OnInit {
  dataSource: any;
  isLoading: boolean;
  divContent: boolean;
  userProfileId: any; roleId: any;
  displayedColumns: string[] = ['EventName', 'NoOfUsers'];

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private http: HttpClient, private TokenService: TokenService, private prefillService: PreFillService,
    private router: Router) { }

  ngOnInit() {
    // debugger;
    // this.getEventWiseReport();
    this.isLoading = true;
    this.divContent = false;

    if (this.prefillService.getUserId() && this.prefillService.getRoleId()) {
      console.log("User Profile Id is" + " " + this.prefillService.getUserId());
      console.log("Role Id is " + " " + this.prefillService.getRoleId());
      this.userProfileId = this.prefillService.getUserId();
      this.roleId = this.prefillService.getRoleId();
      this.getEventWiseReport();
    }
    else if (this.userProfileId == undefined && this.roleId == undefined) {
      this.router.navigate(['login']);
    }

  }

  getEventWiseReport() {
    let EventWiseReport = {
      "LoginUserProfileId": this.userProfileId,
      "RoleId": this.roleId,
    };
    let api = 'WebAdminPanel/EventWiseReport';
    this.TokenService.postdata(this.TokenService.EncryptedData(EventWiseReport), api).then(async res => {
      let deceryptedData = await this.TokenService.DecryptedData(res['response']);
      console.log(deceryptedData);
      this.isLoading = false;
      this.divContent = true;
      let TableData = deceryptedData.responseValue.EventWiseDataReport;
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
