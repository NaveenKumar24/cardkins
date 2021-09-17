import { Component, ViewChild, OnInit, AfterViewInit, } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  EventName: string;
  NoOfUsers: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {EventName: 'Registered Email Varification', NoOfUsers: 50 },
  {EventName: 'Registeration', NoOfUsers: 30 },
  {EventName: 'Profile', NoOfUsers: 40 },
  {EventName: 'Mobile Number', NoOfUsers: 22 },
  {EventName: 'Logout', NoOfUsers: 70 },
  {EventName: 'Login', NoOfUsers: 33 },
  {EventName: 'Forgot Password	', NoOfUsers: 35 },
  {EventName: 'Registered Email Varification', NoOfUsers: 50 },
  {EventName: 'Registered Email Varification', NoOfUsers: 50 },
  {EventName: 'Registered Email Varification', NoOfUsers: 50 },
  {EventName: 'Registered Email Varification', NoOfUsers: 50 },
  {EventName: 'Registered Email Varification', NoOfUsers: 50 }
];


@Component({
  selector: 'app-eventwisereport',
  templateUrl: './eventwisereport.component.html',
  styleUrls: ['./eventwisereport.component.scss']
})
export class EventwisereportComponent implements AfterViewInit, OnInit {
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;

  displayedColumns: string[] = ['EventName', 'NoOfUsers'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
 
  constructor() { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  ngOnInit(): void {
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
