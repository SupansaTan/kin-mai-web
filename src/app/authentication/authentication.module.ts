import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { LoginComponent } from './login/login.component';
import { RegisterRestuarantComponent } from './register/register-restuarant/register-restuarant.component';
import { RegisterReviewerComponent } from './register/register-reviewer/register-reviewer.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationService } from './authentication.service';
import { SharedModule } from '../shared/shared.module';

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
    AuthenticationRoutingModule,
    ModalModule.forRoot(),
    SharedModule,
  ],
  providers: [
    AuthenticationService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class AuthenticationModule { }
