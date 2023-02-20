import { PaymentMethod } from 'src/constant/payment-method.constant';
import { SocialContact } from './../../../enum/social-contact.enum';
import { DeliveryType } from 'src/enum/delivery-type.enum';
import { ResponseModel } from 'src/models/response.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalReviewComponent } from '../modal-review/modal-review.component';
import { ModalGalleryComponent } from '../modal-gallery/modal-gallery.component';
import { GetRestaurantDetailModel, GetRestaurantDetailRequestModel, SocialContactItemModel } from 'src/models/restaurant-detail.model';
import { ReviewerService } from '../reviewer.service';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { LocalStorageKey } from 'src/constant/local-storage-key.constant';
import { environment } from 'src/environments/environment';
import { DrinkAndDessertCategory, FoodCategory } from 'src/constant/food-category.constant';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.scss']
})
export class RestaurantDetailComponent implements OnInit {
  @ViewChild('modalReviewComponent') modalReview: ModalReviewComponent;
  @ViewChild('modalGalleryComponent') modalGallery: ModalGalleryComponent;

  private sub: any;
  restaurantId: string;
  deliveryType = DeliveryType;
  socialContact = SocialContact
  awsS3Url = environment.awsS3Url;
  isLoadingRestaurantInfo: boolean = true;
  restaurantDetail: GetRestaurantDetailModel;

  constructor(
    private route: ActivatedRoute,
    private reviewerService: ReviewerService,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.restaurantId = params['restaurantId'];

      if (this.restaurantId) {
        this.getRestaurantDetail();
      }
    });
  }

  getRestaurantDetail() {
    let request = new GetRestaurantDetailRequestModel();
    request.userId = this.localStorageService.get<string>(LocalStorageKey.userId) ?? '';
    request.latitude = this.localStorageService.get<number>(LocalStorageKey.latitude) ?? 13.736717;
    request.longitude = this.localStorageService.get<number>(LocalStorageKey.longitude) ?? 100.523186;
    request.restaurantId = this.restaurantId;

    this.reviewerService.getRestaurantDetail(request).subscribe(
      (response: ResponseModel<GetRestaurantDetailModel>) => {
        if (response && response?.status === 200) {
          this.restaurantDetail = response.data;
          this.restaurantDetail.socialContactList = response.data.socialContactList.map(function(e) {
            return JSON.parse(e.toString())
          });
          this.isLoadingRestaurantInfo = false;
        }
    })
  }

  getCategoryLable(type: number) {
    if (type > 8) {
      return DrinkAndDessertCategory.find(x => x.id === type)?.name;
    }
    return FoodCategory.find(x => x.id === type)?.name;
  }

  getPaymentMethodLabel(type: number) {
    return PaymentMethod.find(x => x.id === type)?.name;
  }

  getSocialContactIcon(type: number) {
    switch(type) {
      case SocialContact.Tel:
        return 'bi-telephone-fill';
      case SocialContact.Facebook:
        return 'bi-facebook text-primary';
      case SocialContact.Line:
        return 'bi-line text-success';
      case SocialContact.Instagram:
        return 'bi-instagram text-danger';
    }
    return '';
  }

  addReviewRestaurant(restaurantId: string, restaurantName: string) {
    this.modalReview.openReviewModal(true, false, restaurantId, restaurantName);
  }

  seeExistReviewRestaurant(restaurantId: string, restaurantName: string) {
    this.modalReview.openReviewModal(false, false, restaurantId, restaurantName);
  }

  editReviewRestaurant(restaurantId: string, restaurantName: string) {
    this.modalReview.openReviewModal(true, true, restaurantId, restaurantName);
  }

  openModalGallery() {
    this.modalGallery.openSuccessModal();
  }
}
