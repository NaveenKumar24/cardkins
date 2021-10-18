import { Component, ViewChild, OnInit, AfterViewInit, Input } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js'
import  { TokenService } from '../../token.service';

@Component({
  selector: 'app-userse-visiting-cards',
  templateUrl: './userse-visiting-cards.component.html',
  styleUrls: ['./userse-visiting-cards.component.scss']
})

export class UserseVisitingCardsComponent implements  OnInit{

  dataSource:any;
  displayedColumns: string[] = ['Username', 'EvistingCard', 'Status'];

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private http: HttpClient,private TokenService: TokenService) {}

   ngOnInit() {
     this.getUsersVisitingCards();   
   }

   getUsersVisitingCards() {
        let UserVisitingCard = {
          "LoginUserProfileId": 114,
          "RoleId": 2,
        };  

        this.TokenService.UserVisingCards(this.TokenService.EncryptedData(UserVisitingCard)).then(async res => {
          let deceryptedData = await this.TokenService.DecryptedData(res['response']);
          console.log(deceryptedData);
          let TableData = deceryptedData.responseValue.UserEcardStatusReportData;
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

