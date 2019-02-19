import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {HOME_ROUTES} from './modules/home/home.module';
import {AuthGuard} from './shared/guards/auth/auth.guard';

const routes: Routes = [
    {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full'
    },
    {
      path: 'home',
      children: HOME_ROUTES,
      data: {type: 'home'}
    },
    {
      path: 'roulette',
      loadChildren: './modules/roulette/roulette.module#RouletteModule',
      data: {type: 'roulette'}
    },
    {
      path: 'user-dashboard',
      loadChildren: './modules/user-dashboard/user-dashboard.module#UserDashboardModule',
      canActivate: [AuthGuard],
      data: {type: 'dashboard'}
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
