import { Component, ViewChild, OnInit, AfterViewInit, } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  username: string;
  eVisitingCard: string;
  enableanddisable: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {username: 'Anbu', eVisitingCard: 'Manager',enableanddisable: 'Dropdown'},
  {username: 'Kannan', eVisitingCard: 'Director',enableanddisable: 'Dropdown'},
  {username: 'Hari', eVisitingCard: 'Designer',enableanddisable: 'Dropdown'},
  {username: 'Krish', eVisitingCard: 'Director',enableanddisable: 'Dropdown'},
  {username: 'TTH', eVisitingCard: 'Consultant', enableanddisable: 'Dropdown'},
  {username: 'William', eVisitingCard: 'Manager',enableanddisable: 'Dropdown'},
  {username: 'Ram', eVisitingCard: 'Director',enableanddisable: 'Dropdown'},
  {username: 'Ratha', eVisitingCard: 'Designer',enableanddisable: 'Dropdown'},
  {username: 'Saranya', eVisitingCard: 'Director',enableanddisable: 'Dropdown'},
];


@Component({
  selector: 'app-userse-visiting-cards',
  templateUrl: './userse-visiting-cards.component.html',
  styleUrls: ['./userse-visiting-cards.component.scss']
})
export class UserseVisitingCardsComponent implements AfterViewInit {

  displayedColumns: string[] = ['username', 'eVisitingCard', 'enableanddisable'];
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
