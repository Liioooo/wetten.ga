import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoulettRoutingModule } from './roulett-routing.module';
import { RoulettComponent } from './components/roulett/roulett.component';

@NgModule({
  declarations: [RoulettComponent],
  imports: [
    CommonModule,
    RoulettRoutingModule
  ]
})
export class RoulettModule { }
