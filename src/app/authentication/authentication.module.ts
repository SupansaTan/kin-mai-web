import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterRestuarantComponent } from './register/register-restuarant/register-restuarant.component';
import { RegisterReviewerComponent } from './register/register-reviewer/register-reviewer.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
    ResetComponent,
    RegisterComponent,
    RegisterReviewerComponent,
    RegisterRestuarantComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule
  ]
})

export class AuthenticationModule { }
