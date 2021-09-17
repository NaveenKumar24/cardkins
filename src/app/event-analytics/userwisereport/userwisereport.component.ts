import { Component, ViewChild, OnInit, AfterViewInit, } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


export interface PeriodicElement {
  username: string;
  NoOfEvents: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {username: 'Anbu', NoOfEvents: 22},
  {username: 'Bharathi', NoOfEvents: 50},
  {username: 'Hari', NoOfEvents: 33},
  {username: 'Kannan', NoOfEvents: 30},
  {username: 'krishnan', NoOfEvents: 40},
  {username: 'Palani', NoOfEvents: 60},
  {username: 'Ram', NoOfEvents: 35},
  {username: 'Ratha', NoOfEvents: 70},
  {username: 'Saranya', NoOfEvents: 70},
];
@Component({
  selector: 'app-userwisereport',
  templateUrl: './userwisereport.component.html',
  styleUrls: ['./userwisereport.component.scss']
})
export class UserwisereportComponent implements AfterViewInit {

  displayedColumns: string[] = ['username', 'NoOfEvents'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor() { }

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

  ngOnInit(): void {
  }
}
