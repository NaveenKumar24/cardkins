

import { Component, ViewChild, OnInit, AfterViewInit, } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  username: string;
  NoOfScannedContacts: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {username: 'Anbu', NoOfScannedContacts: 10},
  {username: 'Kannan', NoOfScannedContacts: 10},
  {username: 'Mark', NoOfScannedContacts: 10},
  {username: 'Ram', NoOfScannedContacts: 10},
  {username: 'Rama Krishnan	', NoOfScannedContacts: 10},
  {username: 'William', NoOfScannedContacts: 10},
  {username: 'Ram', NoOfScannedContacts: 10},
  {username: 'Ratha', NoOfScannedContacts: 10},
  {username: 'Saranya', NoOfScannedContacts: 10},
];


@Component({
  selector: 'app-count-of-scanned-contacts',
  templateUrl: './count-of-scanned-contacts.component.html',
  styleUrls: ['./count-of-scanned-contacts.component.scss']
})
export class CountOfScannedContactsComponent implements AfterViewInit {

  displayedColumns: string[] = ['username', 'NoOfScannedContacts'];
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
