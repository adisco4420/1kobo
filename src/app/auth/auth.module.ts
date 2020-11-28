import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ngx-custom-validators';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';


@NgModule({
  declarations: [LoginComponent, AuthLayoutComponent, RegisterComponent, ForgotPwdComponent, ConfirmEmailComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
  ]
})
export class AuthModule { }
