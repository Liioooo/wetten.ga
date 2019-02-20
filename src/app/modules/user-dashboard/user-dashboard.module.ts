import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {SharedModule} from '@shared/shared.module';
import { TransferCoinsComponent } from './components/transfer-coins/transfer-coins.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [DashboardComponent, TransferCoinsComponent],
  imports: [
      CommonModule,
      SharedModule,
      UserDashboardRoutingModule,
      ReactiveFormsModule
  ]
})
export class UserDashboardModule { }
