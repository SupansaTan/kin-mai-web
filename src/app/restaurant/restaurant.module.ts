import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GoogleMapsModule } from '@angular/google-maps';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { AvatarModule } from 'ngx-avatar';
import { NgxViewerModule } from '@erengee/ngx-viewer';

import { RestaurantDashboardComponent } from './dashboard/dashboard.component';
import { EditRestaurantDetailComponent } from './edit-detail/edit-detail.component';
import { RestaurantRoutingModule } from './restaurant-routing.module';
import { DetailComponent } from './detail/detail.component';
import { EditRestaurantInfoComponent } from './edit-detail/edit-restaurant-info/edit-restaurant-info.component';
import { EditUploadPhotoComponent } from './edit-detail/edit-upload-photo/edit-upload-photo.component';
import { SharedModule } from '../shared/shared.module';
import { ModalGalleryComponent } from './modal-gallery/modal-gallery.component';
import { SwiperModule } from "swiper/angular";

import { NgCircleProgressModule } from 'ng-circle-progress';
import { GenerateQrCodeComponent } from './generate-qr-code/generate-qr-code.component';

@NgModule({
  declarations: [
    RestaurantDashboardComponent,
    EditRestaurantDetailComponent,
    DetailComponent,
    EditRestaurantInfoComponent,
    EditUploadPhotoComponent,
    ModalGalleryComponent,
    GenerateQrCodeComponent
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
    NgbRatingModule,
    AvatarModule,
    NgxViewerModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class RestaurantModule { }
