import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ReviewerRoutingModule } from './reviewer-routing.module';
import { ReviewerHomepageComponent } from './homepage/homepage.component';
import { ModalFoodComponent } from './modal-food/modal-food.component';
import { ModalDessertComponent } from './modal-dessert/modal-dessert.component';
import { RandomFoodComponent } from './random-food/random-food.component';
import { SearchRestaurantComponent } from './search-result/search-result.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { ModalReviewComponent } from './modal-review/modal-review.component';
import { ModalGalleryComponent } from './modal-gallery/modal-gallery.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { SwiperModule } from "swiper/angular";

@NgModule({
  declarations: [
    ReviewerHomepageComponent,
    ModalFoodComponent,
    ModalDessertComponent,
    RandomFoodComponent,
    SearchRestaurantComponent,
    RestaurantDetailComponent,
    ModalReviewComponent,
    ModalGalleryComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ReviewerRoutingModule,
    NgbRatingModule,
    SwiperModule,
    FormsModule,
  ]
})

export class ReviewerModule { }
