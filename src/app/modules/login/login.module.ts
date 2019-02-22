import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import {SharedModule} from '@shared/shared.module';
import {LoginRoutingModule} from './login-routing.module';
import { RegisterComponent } from './components/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
      LoginRoutingModule,
      CommonModule,
      SharedModule,
      ReactiveFormsModule,
      FormsModule
  ]
})
export class LoginModule { }
