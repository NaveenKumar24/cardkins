import { Component, ViewChild, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import  { TokenService } from '../../token.service';



@Component({
  selector: 'app-userwisereport',
  templateUrl: './userwisereport.component.html',
  styleUrls: ['./userwisereport.component.scss']
})
export class UserwisereportComponent implements OnInit {

  displayedColumns: string[] = ['UserName', 'NoOfEvents'];
  dataSource:any;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private http: HttpClient,private TokenService: TokenService) { }

  ngOnInit() {
    this.getUserWiseReport();
  }

  getUserWiseReport() {
    let UserWiseReport = {
      "LoginUserProfileId": 114,
      "RoleId": 2,
    };
    let api = 'WebAdminPanel/UserWiseReport';
    this.TokenService.postdata(this.TokenService.EncryptedData(UserWiseReport),api).then(async res => {
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
