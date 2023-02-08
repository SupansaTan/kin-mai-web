import { ShortNumberPipe } from './../../pipe/short-number.pipe';
import { ReviewerService } from './reviewer.service';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ReviewerRoutingModule } from './reviewer-routing.module';
import { ReviewerHomepageComponent } from './homepage/homepage.component';
import { RandomFoodComponent } from './random-food/random-food.component';
import { SearchRestaurantComponent } from './search-result/search-result.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { ModalReviewComponent } from './modal-review/modal-review.component';
import { ModalGalleryComponent } from './modal-gallery/modal-gallery.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { SwiperModule } from "swiper/angular";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NearlyRestaurantComponent } from './homepage/nearly-restaurant/nearly-restaurant.component';
import { FilterRestaurantComponent } from './homepage/filter-restaurant/filter-restaurant.component';

@NgModule({
  declarations: [
    ReviewerHomepageComponent,
    RandomFoodComponent,
    SearchRestaurantComponent,
    RestaurantDetailComponent,
    ModalReviewComponent,
    ModalGalleryComponent,
    ShortNumberPipe,
    NearlyRestaurantComponent,
    FilterRestaurantComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ReviewerRoutingModule,
    NgbRatingModule,
    SwiperModule,
    FormsModule,
    MatButtonToggleModule,
  ],
  providers: [
    ReviewerService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class ReviewerModule { }
