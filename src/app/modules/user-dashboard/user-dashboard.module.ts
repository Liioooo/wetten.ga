import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
      CommonModule,
      SharedModule,
      UserDashboardRoutingModule
  ]
})
export class UserDashboardModule { }
