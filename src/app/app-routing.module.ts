import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HOME_ROUTES} from './modules/home/home.module';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', children: HOME_ROUTES}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
