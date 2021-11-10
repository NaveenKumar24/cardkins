import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../token.service';
import { PreFillService } from '../pre-fill.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})


export class DashboardComponent implements OnInit {

  toggleProBanner(event) {
    console.log("123");
    event.preventDefault();
    document.querySelector('body').classList.toggle('removeProbanner');
  }

  displayedColumns: string[] = ['Metatags', 'NumberOfCount'];
  dataSource: any;
  activeUser: any;
  scannedCards: any;
  exchangeCards: any;
  uniqueMetatags: any;
  numberofActiveUsers: any;
  chartActiveUser: any = 0;
  chartscannedCards: any;
  chartexchangeCards: any;
  chartuniqueMetatags: any;
  numberofEnabledDisabledUser: any;
  enableUsers: any;
  disableUsers: any;
  noOfUserActive: any = 0;
  noOfUserScannedCards: any;
  noOfExchangedCards: any;
  trendingMetatagsUsers: any;
  numberOfMetaTags: any;
  numberOfUsers: any;
  trendingTop10MetaTags: any;
  MetaTags: any;
  Users: any;
  userProfileId: any;
  roleId: any;
  public chartOption;
  public donutchartOption;
  public MetaTagchartOption;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private http: HttpClient, private TokenService: TokenService,
    private prefillService: PreFillService, private router: Router) { }

  ngOnInit() {
    // debugger;
    if (this.prefillService.getUserId() && this.prefillService.getRoleId()) {
      console.log("User Profile Id is" + " " + this.prefillService.getUserId());
      console.log("Role Id is " + " " + this.prefillService.getRoleId());
      this.userProfileId = this.prefillService.getUserId();
      this.roleId = this.prefillService.getRoleId();
      console.log(this.userProfileId);
      console.log(this.roleId);
      this.getAllData();
    }
    else if (this.userProfileId == undefined && this.roleId == undefined) {
      this.router.navigate(['login']);
    }

    // this.getAllData();

  }

  getAllData() {
    let DashboardRequest = {
      "LoginUserProfileId": this.userProfileId,
      "RoleId": this.roleId,
    };
    console.log(DashboardRequest);
    let api = 'WebAdminPanel/webDashboardData';
    this.TokenService.postdata(this.TokenService.EncryptedData(DashboardRequest), api).then(async res => {
      let deceryptedData = await this.TokenService.DecryptedData(res['response']);
      console.log(deceryptedData);
      let DashboardData = JSON.stringify(deceryptedData.responseValue.DashboardData);
      // console.log(DashboardData);
      this.activeUser = JSON.stringify(deceryptedData.responseValue.DashboardData.ActiveUser);
      this.scannedCards = JSON.stringify(deceryptedData.responseValue.DashboardData.ScannedCards);
      this.exchangeCards = JSON.stringify(deceryptedData.responseValue.DashboardData.ExchangedCards);
      this.uniqueMetatags = JSON.stringify(deceryptedData.responseValue.DashboardData.MetaTags);

      this.numberofActiveUsers = JSON.stringify(deceryptedData.responseValue.NumberofActiveUser);
      console.log("Chart Data is " + " " + this.numberofActiveUsers);
      this.chartActiveUser = JSON.stringify(deceryptedData.responseValue.NumberofActiveUser.ActiveUser);
      this.chartscannedCards = JSON.stringify(deceryptedData.responseValue.NumberofActiveUser.ScannedCards);
      this.chartexchangeCards = JSON.stringify(deceryptedData.responseValue.NumberofActiveUser.ExchangedCards);
      this.chartuniqueMetatags = JSON.stringify(deceryptedData.responseValue.NumberofActiveUser.MetaTags);

      this.numberofEnabledDisabledUser = JSON.stringify(deceryptedData.responseValue.NumberofEnabledDisabledUser);
      console.log(this.numberofEnabledDisabledUser);


      /*====================================== No Of Active User Chart Start=======================================================*/
      this.chartOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // type: 'shadow'
          }
        },
        legend: {
          orient: 'horizontal',
          bottom: 'bottom'
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',

        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          // showGrid: false,
          data: ['0', '1', '2', '3', '4', '5'],
          splitLine: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#CCC'
            }
          },
        },
        yAxis: {
          type: 'value',
          // border:1,
          // min: 0,
          // max: 400,
          interval: 50,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#CCC'
            }
          },

        },
        series: [
          {
            name: 'Active',
            data: this.chartActiveUser,
            type: 'bar',
            itemStyle: { color: 'rgb(84, 104, 218)' },
          },
          {
            name: 'Users',
            data: this.chartActiveUser,
            type: 'bar',
            itemStyle: { color: 'rgb(109, 96, 176)' },
          },
          {
            name: 'Scanned',
            data: this.chartscannedCards,
            type: 'bar',
            itemStyle: { color: 'rgb(74, 193, 142)' },
          },
          {
            name: 'Metatags',
            data: this.chartuniqueMetatags,
            type: 'line',
            itemStyle: { color: 'rgb(234, 85, 61)' },
          },
          {
            name: 'Exchanged',
            data: this.chartexchangeCards,
            type: 'line',
            itemStyle: { color: 'rgb(255, 187, 68)' },
            smooth: true,
          }
        ]
      }
      /*====================================== No Of Active User Chart End=======================================================*/

      /*===================================== No Users Donut Chart Start =========================================================*/
      this.enableUsers = JSON.stringify(deceryptedData.responseValue.NumberofEnabledDisabledUser.EnabledUser);
      this.disableUsers = JSON.stringify(deceryptedData.responseValue.NumberofEnabledDisabledUser.DisabledUser);
      this.noOfUserActive = JSON.stringify(deceryptedData.responseValue.NumberofEnabledDisabledUser.Active);
      this.noOfUserScannedCards = JSON.stringify(deceryptedData.responseValue.NumberofEnabledDisabledUser.ScannedCards);
      this.noOfExchangedCards = JSON.stringify(deceryptedData.responseValue.NumberofEnabledDisabledUser.ExchangedCards);

      this.donutchartOption = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: 'bottom',
          left: 'center'
        },
        series: [
          {
            // name: 'User Analytics',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'center',
              // name: 'Uer Analytics'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold',

              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: this.noOfUserActive, name: 'Active', itemStyle: { color: 'rgb(84, 104, 218)' } },
              { value: this.noOfUserScannedCards, name: 'Scanned Cards', itemStyle: { color: 'rgb(74, 193, 142)' } },
              { value: this.noOfExchangedCards, name: 'Enchanged Cards', itemStyle: { color: 'rgb(109, 96, 176)' } },
            ]
          }
        ]
      };
      /*===================================== No Users Donut Chart End =========================================================*/

      /*======================================  Top 10 Meta Tags Users Chart Start =============================================*/
      this.trendingMetatagsUsers = JSON.stringify(deceryptedData.responseValue.TrendingMetatagsUsers);
      this.numberOfMetaTags = JSON.stringify(deceryptedData.responseValue.TrendingMetatagsUsers.NumberOfMetaTags);
      this.numberOfUsers = JSON.stringify(deceryptedData.responseValue.TrendingMetatagsUsers.NumberOfUsers);
      this.trendingTop10MetaTags = deceryptedData.responseValue.TrendingMetatagsUsers.TrendingMetatagsTop;
      console.log(this.trendingTop10MetaTags);
      console.log(this.trendingTop10MetaTags.length);
      // debugger;
      let MetatTagsValue = [];
      let UsersValue = [];
      for (let i = 0; i < this.trendingTop10MetaTags.length; i++) {
        MetatTagsValue.push(this.trendingTop10MetaTags[i].Metatags);
        UsersValue.push(this.trendingTop10MetaTags[i].Users);
      }
      console.log('Hi' + MetatTagsValue);
      console.log('Hi' + UsersValue);
      this.MetaTagchartOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // type: 'shadow'
          }
        },
        legend: {
          orient: 'horizontal',
          bottom: 'bottom'
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',

        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          // showGrid: false,
          // data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
          splitLine: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#CCC'
            }
          },
        },
        yAxis: {
          type: 'value',
          // border:1,
          // min: 0,
          // max: 400,
          interval: 5,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#CCC'
            }
          },

        },
        series: [
          {
            name: 'Meta Tags',
            data: MetatTagsValue,
            type: 'bar',
            // areaStyle: {},
            itemStyle: { color: 'rgb(35, 149, 206)' },
          },
          {
            name: 'Users',
            data: UsersValue,
            type: 'line',
            itemStyle: { color: 'rgb(255, 187, 68)' },
          }]
      }
      /*======================================  Top 10 Meta Tags Users Chart Start =============================================*/

      // console.log("Tile Data is" + " " + JSON.stringify(DashboardData));
      let TableData = deceryptedData.responseValue.TrendingMetatags;
      // // console.log("Table Data Length is" + " " + TableData.length);
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
