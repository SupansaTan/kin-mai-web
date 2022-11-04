import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SearchComponent } from './search/search.component';
import { FilterRestaurantComponent } from './filter-restaurant/filter-restaurant.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SeeReviewComponent } from './edit/see-review/see-review.component';
import { EditSeeReviewComponent } from './edit-see-review/edit-see-review.component';
import { RandomFoodComponent } from './random-food/random-food.component';
import { RestHomepageComponent } from './restaurant/rest-homepage/rest-homepage.component';
import { EditDetailComponent } from './restaurant/edit-detail/edit-detail.component';
import { ModalFoodComponent } from './reviewer/modal-food/modal-food.component';
import { ModalDessertComponent } from './reviewer/modal-dessert/modal-dessert.component';
import { ReviewerComponent } from './reviewer/reviewer.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    SearchComponent,
    FilterRestaurantComponent,
    SearchResultComponent,
    SeeReviewComponent,
    EditSeeReviewComponent,
    RandomFoodComponent,
    RestHomepageComponent,
    EditDetailComponent,
    ModalFoodComponent,
    ModalDessertComponent,
    ReviewerComponent,
    RestaurantComponent,
    HomeComponent
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
