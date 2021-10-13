import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import * as EventEmitter from 'events';
import { TokenService } from '../token.service';

const routes: Routes = []

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatTableModule
  ],
  providers: [
    TokenService
  ]
})
export class AppsModule { }
