import { GoogleAuthService } from './../service/google-auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { GoogleMapsModule } from '@angular/google-maps';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

import { LoginComponent } from './login/login.component';
import { RegisterRestaurantComponent } from './register/register-restaurant/register-restaurant.component';
import { RegisterReviewerComponent } from './register/register-reviewer/register-reviewer.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationService } from './authentication.service';
import { SharedModule } from '../shared/shared.module';
import { RestaurantInfoComponent } from './register/register-restaurant/restaurant-info/restaurant-info.component';
import { PersonalInfoComponent } from './register/register-restaurant/personal-info/personal-info.component';
import { UploadPhotoComponent } from './register/register-restaurant/upload-photo/upload-photo.component';
import { LocalStorageService } from '../service/local-storage.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    ResetComponent,
    RegisterComponent,
    RegisterReviewerComponent,
    RegisterRestaurantComponent,
    RestaurantInfoComponent,
    PersonalInfoComponent,
    UploadPhotoComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    ModalModule.forRoot(),
    SharedModule,
    NgSelectModule,
    FormsModule,
    DragDropModule,
    SocialLoginModule,
    GoogleMapsModule,
    GooglePlaceModule,
  ],
  providers: [
    AuthenticationService,
    LocalStorageService,
    GoogleAuthService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class AuthenticationModule { }
