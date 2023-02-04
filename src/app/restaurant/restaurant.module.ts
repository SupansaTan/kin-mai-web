import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GoogleMapsModule } from '@angular/google-maps';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

import { RestaurantDashboardComponent } from './dashboard/dashboard.component';
import { EditRestaurantDetailComponent } from './edit-detail/edit-detail.component';
import { RestaurantRoutingModule } from './restaurant-routing.module';
import { DetailComponent } from './detail/detail.component';
import { EditRestaurantInfoComponent } from './edit-detail/edit-restaurant-info/edit-restaurant-info.component';
import { EditUploadPhotoComponent } from './edit-detail/edit-upload-photo/edit-upload-photo.component';
import { SharedModule } from '../shared/shared.module';
import { ModalGalleryComponent } from './modal-gallery/modal-gallery.component';
import { SwiperModule } from "swiper/angular";

@NgModule({
  declarations: [
    RestaurantDashboardComponent,
    EditRestaurantDetailComponent,
    DetailComponent,
    EditRestaurantInfoComponent,
    EditUploadPhotoComponent,
    ModalGalleryComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RestaurantRoutingModule,
    ModalModule.forRoot(),
    SharedModule,
    NgSelectModule,
    FormsModule,
    DragDropModule,
    GoogleMapsModule,
    GooglePlaceModule,
    SwiperModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class RestaurantModule { }
