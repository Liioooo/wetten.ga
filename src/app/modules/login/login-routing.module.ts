import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from '@login/components/register/register.component';
import {CheckEmailComponent} from '@login/components/check-email/check-email.component';

const routes: Routes = [
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    },
    {
      path: 'login',
      component: LoginComponent,
      data: { type: 'loginLogin'}
    },
    {
      path: 'register',
      component: RegisterComponent,
      data: { type: 'loginRegister'}
    },
    {
        path: 'verify-email',
        component: CheckEmailComponent,
        data: { type: 'loginVerify'}
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
