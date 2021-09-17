import { Component, ViewChild, OnInit, AfterViewInit, } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  username: string;
  NoOfMetaTags: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {username: 'Anbu', NoOfMetaTags: 10},
  {username: 'Kannan', NoOfMetaTags: 10},
  {username: 'Hari', NoOfMetaTags: 10},
  {username: 'Krish', NoOfMetaTags: 10},
  {username: 'TTH', NoOfMetaTags: 10},
  {username: 'William', NoOfMetaTags:10},
  {username: 'Ram', NoOfMetaTags:10},
  {username: 'Ratha', NoOfMetaTags: 10},
  {username: 'Saranya', NoOfMetaTags: 10},
];


@Component({
  selector: 'app-users-wise-meta-tags-report',
  templateUrl: './users-wise-meta-tags-report.component.html',
  styleUrls: ['./users-wise-meta-tags-report.component.scss']
})
export class UsersWiseMetaTagsReportComponent implements AfterViewInit {

  displayedColumns: string[] = ['username', 'NoOfMetaTags'];
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

