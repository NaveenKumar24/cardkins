import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from "@angular/material/dialog";

// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventwisereportComponent } from './eventwisereport/eventwisereport.component';
import { UserwisereportComponent } from './userwisereport/userwisereport.component';


const routes: Routes = [
  { path: 'eventWiseReport', component: EventwisereportComponent },
  { path: 'userWiseReport', component: UserwisereportComponent },
];

@NgModule({
  declarations: [EventwisereportComponent, UserwisereportComponent],
  imports: [
    CommonModule,
    NgbModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    // MatDialog,
    // MatDialogRef, 
    RouterModule.forChild(routes),
  ]
})
export class EventAnalyticsModule { }
