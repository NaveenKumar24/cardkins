import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PreFillService } from '../pre-fill.service';
import { FormControl } from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
// import {DataSource} from '@angular/cdk/collections';
// import {Observable} from 'rxjs/Observable';


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
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  data:any;
  // displayedColumns: string[] = ['EventName', 'TotalCount'];
  // dataSource:any;
  columnNames:any;
  capitalize:any;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  // dataSourceOption = [
  //   { name: "User", value: Data1 }
  // ];

  displayedColumns = [];
  columnOptions = [];
  datasControl = new FormControl();
  columnsControl = new FormControl();

  dataSource = new MatTableDataSource<any>();

  constructor(private prefillService: PreFillService,
    public dialogRef: MatDialogRef<PopupComponent>,) { }

  ngOnInit(): void {
    this.onChangeDatas();
    this.data = this.prefillService.getUserWiseData();
    console.log(this.data);
    if(this.data == null) {
      // debugger;
      console.log("Null Function Called");
      this.dialogRef.close();

    }
    else {
      this.datasControl.setValue(this.data);    
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
   
  }

  onChangeDatas() {
    this.datasControl.valueChanges.subscribe((data: any) => {
      /**dynamic data table**/
      this.displayedColumns = Object.keys(data[0]);
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

     /**set Options**/
      this.columnOptions = Object.keys(data[0]);
      this.columnsControl.setValue(this.columnOptions);
    
    });
  }

  closeDialogue() {
    this.dialogRef.close();
  }
 


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  

}


