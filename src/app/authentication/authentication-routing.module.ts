import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AccessLevel } from 'src/enum/access-level.enum';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../service/auth-guard.service';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuardService],
    data: {
      AccessLevel: [AccessLevel.Public],
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuardService],
    data: {
      AccessLevel: [AccessLevel.Public],
    },
  },
  {
    path: 'register/:firstName/:lastName/:email',
    component: RegisterComponent,
    canActivate: [AuthGuardService],
    data: {
      AccessLevel: [AccessLevel.Public],
    },
  },
  {
    path: 'reset-password/:resetToken',
    component: ResetComponent,
    canActivate: [AuthGuardService],
    data: {
      AccessLevel: [AccessLevel.Public],
    },
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [AuthGuardService],
    data: {
      AccessLevel: [AccessLevel.Public, AccessLevel.Reviewer, AccessLevel.RestaurantOwner],
    },
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
