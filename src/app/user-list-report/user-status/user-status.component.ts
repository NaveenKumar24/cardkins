import { Component, ViewChild, OnInit, AfterViewInit, Input } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js'
import  { TokenService } from '../../token.service';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.scss']
})
export class UserStatusComponent implements  OnInit{

  dataSource:any;
  displayedColumns: string[] = ['username', 'Status'];

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private http: HttpClient,private TokenService: TokenService) {}
   ngOnInit() {
     this.getUserStatus();
   }

   getUserStatus() {
    let UserStatusReport = {
      "LoginUserProfileId": 114,
      "RoleId": 2
      };
      let api = 'WebAdminPanel/UserStatusReport';
      this.TokenService.postdata(this.TokenService.EncryptedData(UserStatusReport),api).then(async res => {
      let deceryptedData = await this.TokenService.DecryptedData(res['response']);
      console.log(deceryptedData);
      let TableData = deceryptedData.responseValue.UserStatusReportData;
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

