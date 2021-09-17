import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DevicSpecsReportComponent} from './devic-specs-report/devic-specs-report.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'deviceSpecsReport', component:DevicSpecsReportComponent },
  { path: 'eventAnalytics', loadChildren: () => import('./event-analytics/event-analytics.module').then(m =>m.EventAnalyticsModule) },
  { path: 'userListReport', loadChildren: () => import ('./user-list-report/user-list-report.module').then(m =>m.UserListReportModule) },
  { path: 'metaTags', loadChildren: () => import ('./meta-tags/meta-tags.module').then(m =>m.MetaTagsModule) },
   { path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule) },
  { path: 'user-pages', loadChildren: () => import('./user-pages/user-pages.module').then(m => m.UserPagesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
