import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoulettRoutingModule } from './roulett-routing.module';
import { RoulettComponent } from './components/roulett/roulett.component';
import { RoulettRollerComponent } from './components/roulett-roller/roulett-roller.component';

@NgModule({
  declarations: [RoulettComponent, RoulettRollerComponent],
  imports: [
    CommonModule,
    RoulettRoutingModule
  ]
})
export class RoulettModule { }
