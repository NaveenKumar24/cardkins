import { Component, ViewChild, OnInit, AfterViewInit, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js'
import { TokenService } from '../../token.service';

@Component({
  selector: 'app-users-wise-meta-tags-report',
  templateUrl: './users-wise-meta-tags-report.component.html',
  styleUrls: ['./users-wise-meta-tags-report.component.scss']
})
export class UsersWiseMetaTagsReportComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = ['username', 'NoOfMetaTags'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private http: HttpClient,private TokenService: TokenService) { }
    ngOnInit() {
      this.getUserWiseMetaTagsReports();
    }


    getUserWiseMetaTagsReports() {
        let UserWiseMetaTagsReport = {
          "LoginUserProfileId": 114,
          "RoleId": 2
        };
        let api = 'WebAdminPanel/UserWiseMetaTagsReport';
        this.TokenService.postdata(this.TokenService.EncryptedData(UserWiseMetaTagsReport),api).then(async res => {
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


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

