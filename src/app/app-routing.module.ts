import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HOME_ROUTES} from './modules/home/home.module';
import {AuthGuard} from './shared/guards/auth/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', children: HOME_ROUTES},
    { path: 'roulett', loadChildren: './modules/roulett/roulett.module#RoulettModule'},
    { path: 'user-dashboard', loadChildren: './modules/user-dashboard/user-dashboard.module#UserDashboardModule', canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
