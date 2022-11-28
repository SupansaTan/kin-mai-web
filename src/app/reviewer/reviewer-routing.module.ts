import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RandomFoodComponent } from './random-food/random-food.component';
import { ReviewerHomepageComponent } from './homepage/homepage.component';
import { SearchRestaurantComponent } from './search-result/search-result.component';

const routes: Routes = [
  {
    path: '',
    component: ReviewerHomepageComponent
  },
  {
    path: '/find',
    component: SearchRestaurantComponent
  },
  {
    path: '/random',
    component: RandomFoodComponent
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
