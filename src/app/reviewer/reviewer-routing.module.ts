import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RandomFoodComponent } from './random-food/random-food.component';
import { ReviewerHomepageComponent } from './homepage/homepage.component';
import { SearchRestaurantComponent } from './search-result/search-result.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { AuthGuardService } from '../service/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: ReviewerHomepageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'find',
    component: SearchRestaurantComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'random',
    component: RandomFoodComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'restaurant',
    component: RestaurantDetailComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    redirectTo: '/reviewer',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewerRoutingModule { }
