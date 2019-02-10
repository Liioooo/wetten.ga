import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HOME_ROUTES} from './modules/home/home.module';
import {AuthGuard} from './shared/guards/auth/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', children: HOME_ROUTES},
    { path: 'roulette', loadChildren: './modules/roulette/roulette.module#RouletteModule'},
    { path: 'user-dashboard', loadChildren: './modules/user-dashboard/user-dashboard.module#UserDashboardModule', canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
