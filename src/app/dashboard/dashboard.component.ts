import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { EChartOption } from 'echarts';

export interface PeriodicElement {
  MetaTags: string;
  NoOfCounts: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {MetaTags: 'Web Designer', NoOfCounts: 50},
  {MetaTags: 'Web', NoOfCounts: 400},
  {MetaTags: 'User Interface', NoOfCounts: 350},
  {MetaTags: '.Net', NoOfCounts: 300},
  {MetaTags: '.Net Developer', NoOfCounts: 250},
  {MetaTags: 'TTH', NoOfCounts: 200},
  {MetaTags: 'Wipro	', NoOfCounts: 150},
  {MetaTags: 'CTS', NoOfCounts: 100},
  {MetaTags: 'TATA', NoOfCounts: 50},
  {MetaTags: 'Angular', NoOfCounts: 30},
  {MetaTags: 'Java', NoOfCounts: 460}
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})


export class DashboardComponent implements AfterViewInit, OnInit {

  toggleProBanner(event) {
    console.log("123");
    event.preventDefault();
    document.querySelector('body').classList.toggle('removeProbanner');
  }

  displayedColumns: string[] = ['MetaTags', 'NoOfCounts'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  date: Date = new Date();

  chartOption: EChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
          // type: 'shadow'
      }
  },
  legend: {
    orient: 'horizontal',
    bottom:'bottom'
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
      showGrid: false,
      data: ['0','1', '2', '3', '4', '5'],
      splitLine: {
        show: false
     },
      axisLine: {
        show: true,
        lineStyle: {
          color:'#CCC'
        }
      },
    },
    yAxis: {
      type: 'value',
      border:1,
      min:0,
      max:400,
      interval:50,
      axisLine: {
        show: true,
        lineStyle: {
          color:'#CCC'
        }
      },
     
    },
    series: [
      {
      name:'Active',
      data: [30, 20, 50, 40, 60, 50],
      type: 'bar',
      areaStyle: {},
      itemStyle: {color: 'rgb(84, 104, 218)'},
    },
    {
      name:'Users',
      data: [130, 120, 150, 140, 160, 150],
      type: 'bar',
      areaStyle: {},
      itemStyle: {color: 'rgb(109, 96, 176)'},
    },
    {
      name:'Scanned',
      data: [200, 130, 90, 240, 130,220],
      type: 'bar',
      areaStyle: {},
      itemStyle: {color: 'rgb(74, 193, 142)'},
    },
    {
      name:'Metatags',
      data: [200, 130, 90, 240, 130,220],
      type: 'line',
      itemStyle: {color: 'rgb(234, 85, 61)'},
    },
    {
      name:'Exchanged',
      data: [300, 200, 160, 400, 250, 250],
      type: 'line',
      itemStyle: {color: 'rgb(255, 187, 68)'},
      smooth: true,
    }
  ]
  }  

  donutchartOption: EChartOption = {
  // option = {
    tooltip: {
        trigger: 'item'
    },
    legend: {
        bottom: 'bottom',
        left: 'center'
    },
    series: [
        {
            name: 'User Analytics',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: true,
                position: 'center',
                name: 'Uer Analytics'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '28',
                    fontWeight: 'bold',
                   
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 1048, name: 'Active', itemStyle: {color: 'rgb(84, 104, 218)'}},              
                {value: 580, name: 'Scanned', itemStyle: {color: 'rgb(74, 193, 142)'}},
                {value: 735, name: 'Enchanged',itemStyle: {color: 'rgb(109, 96, 176)'}},
            ]
        }
    ]
};

MetaTagchartOption: EChartOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
        // type: 'shadow'
    }
},
legend: {
  orient: 'horizontal',
  bottom:'bottom'
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
    showGrid: false,
    data: ['0','1', '2', '3', '4', '5','6','7','8','9'],
    splitLine: {
      show: false
   },
    axisLine: {
      show: true,
      lineStyle: {
        color:'#CCC'
      }
    },
  },
  yAxis: {
    type: 'value',
    border:1,
    min:0,
    max:400,
    interval:50,
    axisLine: {
      show: true,
      lineStyle: {
        color:'#CCC'
      }
    },
   
  },
  series: [
    {
    name:'Meta Tags',
    data: [30, 200, 10, 400, 150, 250,30,200,100,400],
    type: 'bar',
    areaStyle: {},
    itemStyle: {color: 'rgb(35, 149, 206)'},
  },
  {
    name:'Users',
    data: [50, 20, 10, 40, 15, 25, 20, 10, 40, 15],
    type: 'line',
    itemStyle: {color: 'rgb(255, 187, 68)'},
  }]
}

}
