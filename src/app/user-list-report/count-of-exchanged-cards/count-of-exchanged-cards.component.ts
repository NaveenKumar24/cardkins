import { Component, ViewChild, OnInit, AfterViewInit, Input } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js'
import  { TokenService } from '../../token.service';

@Component({
  selector: 'app-count-of-exchanged-cards',
  templateUrl: './count-of-exchanged-cards.component.html',
  styleUrls: ['./count-of-exchanged-cards.component.scss']
})

export class CountOfExchangedCardsComponent implements  OnInit{

  dataSource:any;
  displayedColumns: string[] = ['username', 'NoOfCardExchanged'];

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private http: HttpClient,private TokenService: TokenService) {}


   ngOnInit() {
      this.getCountExchangedCards();
   }

   getCountExchangedCards() {
        let CountofExchangedCards = {
          "LoginUserProfileId": 114,
          "RoleId": 2,
          "Flag":"E"
        };
        this.TokenService.countOfExchangedCards(this.TokenService.EncryptedData(CountofExchangedCards)).then(async res => {
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

