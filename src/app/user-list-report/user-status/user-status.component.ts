import { Component, ViewChild, OnInit, AfterViewInit, } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  username: string;
  Status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {username: 'Anbu', Status: 'Dropdown'},
  {username: 'Bharathi', Status: 'Dropdown'},
  {username: 'Hari', Status: 'Dropdown'},
  {username: 'Kannan', Status: 'Dropdown'},
  {username: 'krishnan', Status: 'Dropdown'},
  {username: 'Palani', Status: 'Dropdown'},
  {username: 'Ram', Status: 'Dropdown'},
  {username: 'Ratha', Status: 'Dropdown'},
  {username: 'Saranya', Status: 'Dropdown'},
];

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.scss']
})
export class UserStatusComponent implements AfterViewInit {

  displayedColumns: string[] = ['username', 'Status'];
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
}
