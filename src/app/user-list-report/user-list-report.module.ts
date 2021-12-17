import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
// import { PopupComponent } from '../popup1/popup1.component';
// import { FormsModule } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { UserStatusComponent } from './user-status/user-status.component';
import { CountOfExchangedCardsComponent } from './count-of-exchanged-cards/count-of-exchanged-cards.component';
import { CountOfScannedContactsComponent } from './count-of-scanned-contacts/count-of-scanned-contacts.component';
import { UserseVisitingCardsComponent } from './userse-visiting-cards/userse-visiting-cards.component';
import { UserseVisitingCardsMetaComponent } from './userse-visiting-cards-meta/userse-visiting-cards-meta.component';

const routes: Routes = [
  { path: 'userStatus', component: UserStatusComponent },
  { path: 'countOfExchangeCards', component: CountOfExchangedCardsComponent},
  { path: 'countOfScannedCards', component: CountOfScannedContactsComponent},
  // { path: 'usersEVisitingCards', component: UserseVisitingCardsComponent},
  // { path: 'usersEVisitingCardsMeta', component: UserseVisitingCardsMetaComponent},
];

@NgModule({
  declarations: [UserStatusComponent, CountOfExchangedCardsComponent, CountOfScannedContactsComponent, UserseVisitingCardsComponent, 
    UserseVisitingCardsMetaComponent],
  imports: [
    CommonModule,
    NgbModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class UserListReportModule { }
