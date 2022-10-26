import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { RegisterReviewerComponent } from './register-reviewer/register-reviewer.component';
import { RegisterRestuarantComponent } from './register-restuarant/register-restuarant.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'register/reviewer',
    component: RegisterReviewerComponent
  },
  {
    path: 'register/restaurant',
    component: RegisterRestuarantComponent
  },
  {
    path: 'reset-password',
    component: ResetComponent
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
