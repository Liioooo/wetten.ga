import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoulettComponent} from './components/roulett/roulett.component';

const routes: Routes = [
  {path: '', component: RoulettComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoulettRoutingModule { }
