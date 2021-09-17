import { Component, ViewChild, OnInit, AfterViewInit, } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  MetaTags: string;
  NoOfMetaTags: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {MetaTags: 'Anbu', NoOfMetaTags: 10},
  {MetaTags: 'Kannan', NoOfMetaTags: 10},
  {MetaTags: 'Hari', NoOfMetaTags: 10},
  {MetaTags: 'Krish', NoOfMetaTags: 10},
  {MetaTags: 'TTH', NoOfMetaTags: 10},
  {MetaTags: 'William', NoOfMetaTags:10},
  {MetaTags: 'Ram', NoOfMetaTags:10},
  {MetaTags: 'Ratha', NoOfMetaTags: 10},
  {MetaTags: 'Saranya', NoOfMetaTags: 10},
];


@Component({
  selector: 'app-meta-tags-report',
  templateUrl: './meta-tags-report.component.html',
  styleUrls: ['./meta-tags-report.component.scss']
})
export class MetaTagsReportComponent implements AfterViewInit {

  displayedColumns: string[] = ['MetaTags', 'NoOfMetaTags'];
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




