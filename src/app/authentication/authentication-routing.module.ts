import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { RegisReviewComponent } from './regis-review/regis-review.component';
import { RegisRestuarantComponent } from './regis-restuarant/regis-restuarant.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent

  },

  {

    path: 'regis',
    component: RegisterComponent

  },

  {

    path: 'regis/review',
    component: RegisReviewComponent

  },

  {

    path: 'regis/restaurant',
    component: RegisRestuarantComponent

  },

  {
    path: 'reset',
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
