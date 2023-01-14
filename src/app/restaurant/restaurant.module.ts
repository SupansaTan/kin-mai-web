import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RestaurantDashboardComponent } from './dashboard/dashboard.component';
import { EditRestaurantDetailComponent } from './edit-detail/edit-detail.component';
import { RestaurantRoutingModule } from './restaurant-routing.module';
import { DetailComponent } from './detail/detail.component';
import { EditRestaurantInfoComponent } from './edit-detail/edit-restaurant-info/edit-restaurant-info.component';

@NgModule({
  declarations: [
    RestaurantDashboardComponent,
    EditRestaurantDetailComponent,
    DetailComponent,
    EditRestaurantInfoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RestaurantRoutingModule
  ]
})

export class RestaurantModule { }
