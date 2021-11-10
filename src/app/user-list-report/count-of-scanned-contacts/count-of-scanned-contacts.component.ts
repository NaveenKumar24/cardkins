import { Component, ViewChild, OnInit, AfterViewInit, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PreFillService } from '../../pre-fill.service';
import { TokenService } from '../../token.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-count-of-scanned-contacts',
  templateUrl: './count-of-scanned-contacts.component.html',
  styleUrls: ['./count-of-scanned-contacts.component.scss']
})

export class CountOfScannedContactsComponent implements OnInit {

  dataSource: any;
  userProfileId: any; roleId: any;
  displayedColumns: string[] = ['username', 'NoOfCardExchanged'];

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private http: HttpClient, private TokenService: TokenService, private prefillService: PreFillService,
    private router: Router) { }

  ngOnInit() {
    if (this.prefillService.getUserId() && this.prefillService.getRoleId()) {
      console.log("User Profile Id is" + " " + this.prefillService.getUserId());
      console.log("Role Id is " + " " + this.prefillService.getRoleId());
      this.userProfileId = this.prefillService.getUserId();
      this.roleId = this.prefillService.getRoleId();
      this.getCountOfScannedContacts();
    }
    else if (this.userProfileId == undefined && this.roleId == undefined) {
      this.router.navigate(['login']);
    }

  }

  getCountOfScannedContacts() {
    let CountOfScannedContacts = {
      "LoginUserProfileId": this.userProfileId,
      "RoleId": this.roleId,
      "Flag": "S"
    };
    // let CountOfScannedContacts = {
    //   "LoginUserProfileId": 114,
    //   "RoleId": 2,
    //   "Flag": "S"
    // };
    let api = 'WebAdminPanel/ExchangedAndScannedCardReport';
    this.TokenService.postdata(this.TokenService.EncryptedData(CountOfScannedContacts), api).then(async res => {
      let deceryptedData = await this.TokenService.DecryptedData(res['response']);
      console.log(deceryptedData);
      let TableData = deceryptedData.responseValue.ExchangeAndScannedCardDataReport;
      // console.log("Table Data Length is" + " " + TableData.length);
      this.dataSource = new MatTableDataSource(TableData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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

