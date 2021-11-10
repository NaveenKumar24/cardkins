import { Component, ViewChild, OnInit, AfterViewInit, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../../token.service';
import { PreFillService } from '../../pre-fill.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-count-of-exchanged-cards',
  templateUrl: './count-of-exchanged-cards.component.html',
  styleUrls: ['./count-of-exchanged-cards.component.scss']
})

export class CountOfExchangedCardsComponent implements  OnInit{

  dataSource:any;
  userProfileId:any;roleId:any;
  displayedColumns: string[] = ['username', 'NoOfCardExchanged'];

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private http: HttpClient,private TokenService: TokenService, private prefillService : PreFillService,
    private router: Router) {}


   ngOnInit() {
    if(this.prefillService.getUserId() && this.prefillService.getRoleId()) {
      console.log("User Profile Id is" + " " + this.prefillService.getUserId());
      console.log("Role Id is " + " " + this.prefillService.getRoleId());
      this.userProfileId = this.prefillService.getUserId();
      this.roleId = this.prefillService.getRoleId();
      this.getCountExchangedCards();
    }
    else if (this.userProfileId == undefined && this.roleId == undefined) {
      this.router.navigate(['login']);
    }
    // this.getCountExchangedCards();
     
   }

   getCountExchangedCards() {
        let CountofExchangedCards = {
          "LoginUserProfileId": this.userProfileId,
          "RoleId": this.roleId,
          "Flag":"E"
        };
        // let CountofExchangedCards = {
        //   "LoginUserProfileId": 114,
        //   "RoleId":2,
        //   "Flag":"E"
        // };
        let api = 'WebAdminPanel/ExchangedAndScannedCardReport';
        this.TokenService.postdata(this.TokenService.EncryptedData(CountofExchangedCards),api).then(async res => {
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

