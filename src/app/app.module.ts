import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterRestaurantComponent } from './reviewer/filter-restaurant/filter-restaurant.component';
import { SearchResultComponent } from './reviewer/search-result/search-result.component';
import { RandomFoodComponent } from './reviewer/random-food/random-food.component';
import { ModalFoodComponent } from './reviewer/modal-food/modal-food.component';
import { ModalDessertComponent } from './reviewer/modal-dessert/modal-dessert.component';
import { ReviewerComponent } from './reviewer/reviewer.component';


@NgModule({
  declarations: [
    AppComponent,
    FilterRestaurantComponent,
    SearchResultComponent,
    RandomFoodComponent,
    ModalFoodComponent,
    ModalDessertComponent,
    ReviewerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
