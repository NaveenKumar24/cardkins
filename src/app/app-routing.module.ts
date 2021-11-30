import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DevicSpecsReportComponent} from './devic-specs-report/devic-specs-report.component';
// import { PopupComponent} from './popup1/popup1.component';
import { ModalPopupComponent} from '../app/shared/modal-popup/modal-popup.component';
import { CardsComponent } from './cards/cards.component';
import { NoOfCardsExchangedandScannedComponent} from './no-of-cards-exchangedand-scanned/no-of-cards-exchangedand-scanned.component'
import { CardDetailsComponent } from './card-details/card-details.component';
import { NoOfExchangeCardsComponent} from './no-of-exchange-cards/no-of-exchange-cards.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'user-pages', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'cards', component: CardsComponent},
  { path: 'noOfCards', component: NoOfCardsExchangedandScannedComponent},
  { path: 'noOfCardsExchanged', component: NoOfExchangeCardsComponent},
  // { path: 'cardsDetails', component: CardDetailsComponent},
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'deviceSpecsReport', component:DevicSpecsReportComponent },
  // { path: 'popup', component : ModalPopupComponent},
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
export const routingComponents = [
  LoginComponent,
  DashboardComponent,
  DevicSpecsReportComponent,
  // PopupComponent,
  // ModelPopupComponent
]
