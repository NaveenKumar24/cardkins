import { Component, ViewChild, OnInit, AfterViewInit, } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  username: string;
  NoOfCardsExchanged: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {username: 'Anbu', NoOfCardsExchanged: 10},
  {username: 'Bharathi', NoOfCardsExchanged: 10},
  {username: 'Hari', NoOfCardsExchanged: 10},
  {username: 'Kannan', NoOfCardsExchanged: 10},
  {username: 'krishnan', NoOfCardsExchanged: 10},
  {username: 'Palani', NoOfCardsExchanged: 10},
  {username: 'Ram', NoOfCardsExchanged: 10},
  {username: 'Ratha', NoOfCardsExchanged: 10},
  {username: 'Saranya', NoOfCardsExchanged: 10},
];


@Component({
  selector: 'app-count-of-exchanged-cards',
  templateUrl: './count-of-exchanged-cards.component.html',
  styleUrls: ['./count-of-exchanged-cards.component.scss']
})
export class CountOfExchangedCardsComponent implements AfterViewInit {

  displayedColumns: string[] = ['username', 'NoOfCardsExchanged'];
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
