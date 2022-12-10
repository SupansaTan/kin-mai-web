import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RestaurantDashboardComponent } from './dashboard/dashboard.component';
import { EditRestaurantDetailComponent } from './edit-detail/edit-detail.component';

const routes: Routes = [
  {
    path: '',
    component: RestaurantDashboardComponent
  },
  {
    path: 'edit',
    component: EditRestaurantDetailComponent
  },
  {
    path: '',
    redirectTo: '/restaurant',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule { }
