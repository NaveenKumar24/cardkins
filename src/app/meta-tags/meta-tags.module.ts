import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { UsersWiseMetaTagsReportComponent } from './users-wise-meta-tags-report/users-wise-meta-tags-report.component';
import { MetaTagsReportComponent } from './meta-tags-report/meta-tags-report.component';
const routes: Routes = [
  { path: 'userWiseMetaTagsReport', component: UsersWiseMetaTagsReportComponent },
  { path: 'metaTagsReport', component: MetaTagsReportComponent },
];

@NgModule({
  declarations: [UsersWiseMetaTagsReportComponent,MetaTagsReportComponent],
  imports: [
    CommonModule,
    NgbModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule.forChild(routes),
  ]
})
export class MetaTagsModule { }
