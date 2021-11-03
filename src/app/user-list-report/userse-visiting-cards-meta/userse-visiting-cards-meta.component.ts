import { Component, ViewChild, OnInit, Renderer2, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../../token.service';
import { PreFillService } from '../../pre-fill.service';
import { Router, RouterModule } from '@angular/router';

interface StausType {
  Status: boolean;
  Label: string;
}

@Component({
  selector: 'app-userse-visiting-cards-meta',
  templateUrl: './userse-visiting-cards-meta.component.html',
  styleUrls: ['./userse-visiting-cards-meta.component.scss']
})

export class UserseVisitingCardsMetaComponent implements OnInit {
  dataSource: any;
  userProfileId: any; roleId: any; userCardId: any;
  displayedColumns: string[] = ['UserName', 'MetaTag', 'Status'];
  selectedStatus: any;
  status: StausType[] = [
    { Status: true, Label: 'Active' },
    { Status: false, Label: 'InActive' }
  ];

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private http: HttpClient, private TokenService: TokenService, private renderer: Renderer2, private el: ElementRef,
    private prefillService: PreFillService, private router: Router) { }


  ngOnInit() {
    if (this.prefillService.getUserId() && this.prefillService.getRoleId()) {
      console.log("User Profile Id is" + " " + this.prefillService.getUserId());
      console.log("Role Id is " + " " + this.prefillService.getRoleId());
      this.userProfileId = this.prefillService.getUserId();
      this.roleId = this.prefillService.getRoleId();
      this.userCardId = this.prefillService.getUserCardId();
      this.getUsersVisitingCardsMeta();
    }
    else if (this.userProfileId == undefined && this.roleId == undefined) {
      this.router.navigate(['login']);
    }

  }

  getUsersVisitingCardsMeta() {
    let UserVisitingCardDetails = {
      "LoginUserProfileId": this.userProfileId,
      "RoleId": this.roleId,
    };
    let api = 'WebAdminPanel/UserEVistingCardMetaTagReport';
    this.TokenService.postdata(this.TokenService.EncryptedData(UserVisitingCardDetails), api).then(async res => {
      let deceryptedData = await this.TokenService.DecryptedData(res['response']);
      console.log(deceryptedData);
      let TableData = deceryptedData.responseValue.UserWiseCardMetaTagsDataReport;
      // console.log("Table Data Length is" + " " + TableData.length);
      this.dataSource = new MatTableDataSource(TableData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }).catch(err => {
      JSON.parse(JSON.stringify(err))
      console.log(err.message);
    })
  }

  onChange(value: any, element: any) {
    console.log("selected value", value);
    let userId = JSON.stringify(element.UserProfileId)
    console.log("selected value", value);

    let editUserEVistingCardMetaTagStatus = {
      "LoginUserProfileId": this.userProfileId,
      "RoleId": this.roleId,
      "UserProfileId": userId,
      "UserCardId": this.userCardId,
      "Status": value
    }
    console.log(editUserEVistingCardMetaTagStatus);
    let api = 'WebAdminPanel/editUserEVistingCardMetaTagReport';
    this.TokenService.postdata(this.TokenService.EncryptedData(editUserEVistingCardMetaTagStatus), api).then(async res => {
      let deceryptedData = await this.TokenService.DecryptedData(res['response']);
      console.log(deceryptedData);
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

