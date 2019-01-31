import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import {SharedModule} from '../../shared/shared.module';
import {Routes} from '@angular/router';

export const HOME_ROUTES: Routes = [
    {path: '', component: HomeComponent}
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
      CommonModule,
      SharedModule
  ]
})
export class HomeModule { }
