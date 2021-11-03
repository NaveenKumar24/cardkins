import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


export interface PeriodicElement {
  devicename: string;
  NoOfUsers: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { devicename: 'Projector', NoOfUsers: 70 },
  { devicename: 'Projector', NoOfUsers: 70 },
  { devicename: 'Printers', NoOfUsers: 33 },
  { devicename: 'Plotters', NoOfUsers: 35 },
  { devicename: 'Monitor', NoOfUsers: 30 },
  { devicename: 'Microfiche', NoOfUsers: 50 },
  { devicename: 'LCD Projection Panels	', NoOfUsers: 22 },
  { devicename: 'Head Phone', NoOfUsers: 40 },
  { devicename: 'Head Phone', NoOfUsers: 40 },
  { devicename: 'Computer Output Microfilm	', NoOfUsers: 60 },
  { devicename: 'Computer Output Microfilm		', NoOfUsers: 60 }
];

@Component({
  selector: 'app-devic-specs-report',
  templateUrl: './devic-specs-report.component.html',
  styleUrls: ['./devic-specs-report.component.scss']
})
export class DevicSpecsReportComponent implements AfterViewInit {

  displayedColumns: string[] = ['devicename', 'NoOfUsers'];
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
