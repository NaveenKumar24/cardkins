import { Component, ViewChild, OnInit, AfterViewInit, } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  username: string;
  MetaTag: string;
  enableanddisable: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {username: 'Anbu', MetaTag: 'TTH',enableanddisable: 'Dropdown'},
  {username: 'Kannan', MetaTag: 'Chennai',enableanddisable: 'Dropdown'},
  {username: 'Hari', MetaTag: 'Web',enableanddisable: 'Dropdown'},
  {username: 'Krish', MetaTag: 'UI',enableanddisable: 'Dropdown'},
  {username: 'TTH', MetaTag: 'Wipro', enableanddisable: 'Dropdown'},
  {username: 'William', MetaTag: 'TTH',enableanddisable: 'Dropdown'},
  {username: 'Ram', MetaTag: 'Chennai',enableanddisable: 'Dropdown'},
  {username: 'Ratha', MetaTag: 'Web',enableanddisable: 'Dropdown'},
  {username: 'Saranya', MetaTag: 'UI',enableanddisable: 'Dropdown'},
];


@Component({
  selector: 'app-userse-visiting-cards-meta',
  templateUrl: './userse-visiting-cards-meta.component.html',
  styleUrls: ['./userse-visiting-cards-meta.component.scss']
})
export class UserseVisitingCardsMetaComponent implements AfterViewInit {

  displayedColumns: string[] = ['username', 'MetaTag', 'enableanddisable'];
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
