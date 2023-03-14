import { ShortNumberPipe } from './../../pipe/short-number.pipe';
import { ReviewerService } from './reviewer.service';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EllipsisModule } from 'ngx-ellipsis';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxViewerModule } from '@erengee/ngx-viewer';
import { AvatarModule } from 'ngx-avatar';

import { ReviewerRoutingModule } from './reviewer-routing.module';
import { ReviewerHomepageComponent } from './homepage/homepage.component';
import { RandomFoodComponent } from './random-food/random-food.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { ModalReviewComponent } from './modal-review/modal-review.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NearlyRestaurantComponent } from './homepage/nearly-restaurant/nearly-restaurant.component';
import { FilterRestaurantComponent } from './homepage/filter-restaurant/filter-restaurant.component';
import { SharedModule } from '../shared/shared.module';
import { FavoriteRestaurantComponent } from './favorite-restaurant/favorite-restaurant.component';

@NgModule({
  declarations: [
    ReviewerHomepageComponent,
    RandomFoodComponent,
    RestaurantDetailComponent,
    ModalReviewComponent,
    ShortNumberPipe,
    NearlyRestaurantComponent,
    FilterRestaurantComponent,
    FavoriteRestaurantComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ReviewerRoutingModule,
    NgbRatingModule,
    FormsModule,
    EllipsisModule,
    SharedModule,
    NgbCollapseModule,
    NgxViewerModule,
    AvatarModule,
  ],
  providers: [
    ReviewerService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class ReviewerModule { }
