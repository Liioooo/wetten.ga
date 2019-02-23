import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import {SharedModule} from '@shared/shared.module';
import {LoginRoutingModule} from './login-routing.module';
import { RegisterComponent } from './components/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CheckEmailComponent } from './components/check-email/check-email.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, CheckEmailComponent],
  imports: [
      LoginRoutingModule,
      CommonModule,
      SharedModule,
      ReactiveFormsModule,
      FormsModule
  ]
})
export class LoginModule { }
