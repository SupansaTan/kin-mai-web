import { PaymentMethod } from 'src/constant/payment-method.constant';
import { SocialContact } from './../../../enum/social-contact.enum';
import { DeliveryType } from 'src/enum/delivery-type.enum';
import { ResponseModel } from 'src/models/response.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalReviewComponent } from '../modal-review/modal-review.component';
import { GetRestaurantDetailModel, GetRestaurantDetailRequestModel, SocialContactItemModel } from 'src/models/restaurant-detail.model';
import { ReviewerService } from '../reviewer.service';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { LocalStorageKey } from 'src/constant/local-storage-key.constant';
import { environment } from 'src/environments/environment';
import { DrinkAndDessertCategory, FoodCategory } from 'src/constant/food-category.constant';
import { GetReviewInfoFilterModel, GetReviewInfoListModel, GetReviewInfoModel } from 'src/models/get-review-info.model';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.scss']
})
export class RestaurantDetailComponent implements OnInit {
  @ViewChild('modalReviewComponent') modalReview: ModalReviewComponent;

  private sub: any;
  restaurantId: string;
  keywords: string = "";
  ratingFilter: number = 6;
  isSelectedTotalReview: boolean = true;
  isSelectedOnlyReviewHaveImage: boolean = false;
  isSelectedOnlyReviewHaveComment: boolean = false;
  isSelectedOnlyReviewHaveFoodRecommend: boolean = false;
  reviewList: Array<GetReviewInfoModel>;
  totalReview: number = 0;
  totalReviewHaveImage: number = 0;
  totalReviewHaveComment: number = 0;
  totalReviewHaveFoodRecommend: number = 0;
  deliveryType = DeliveryType;
  socialContact = SocialContact
  awsS3Url = environment.awsS3Url;
  isLoadingRestaurantInfo: boolean = true;
  isLoadingReviewList: boolean = true;
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
        this.getReviewList();
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

  getReviewList() {
    let request = new GetReviewInfoFilterModel();
    request.restaurantId = this.restaurantId;
    request.keywords = this.keywords;
    request.rating = this.ratingFilter;
    request.isOnlyReviewHaveImage = this.isSelectedOnlyReviewHaveImage;
    request.isOnlyReviewHaveComment = this.isSelectedOnlyReviewHaveComment;
    request.isOnlyReviewHaveFoodRecommend = this.isSelectedOnlyReviewHaveFoodRecommend;

    this.reviewerService.getRestaurantReviewList(request).subscribe(
      (response: ResponseModel<GetReviewInfoListModel>) => {
        if (response && response?.status === 200) {
          this.reviewList = response.data.reviewList;
          this.totalReview = response.data.totalReview;
          this.totalReviewHaveImage = response.data.totalReviewHaveImage;
          this.totalReviewHaveComment = response.data.totalReviewHaveComment;
          this.totalReviewHaveFoodRecommend = response.data.totalReviewHaveFoodRecommend;
          this.isLoadingReviewList = false;
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

  numberEnding (number: number) {
    return (number > 1) ? 's' : '';
  }

  millisecondsToStr (milliseconds: number) {
    var temp = Math.floor(milliseconds / 1000);
    var years = Math.floor(temp / 31536000);
    if (years) {
      return years + ' year' + this.numberEnding(years);
    }

    var days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
      return days + ' day' + this.numberEnding(days);
    }

    var hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
      return hours + ' hour' + this.numberEnding(hours);
    }

    var minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
      return minutes + ' minute' + this.numberEnding(minutes);
    }

    var seconds = temp % 60;
    if (seconds) {
      return seconds + ' second' + this.numberEnding(seconds);
    }
    return 'less than a second';
  }

  changeFilterButton(i: number) {
    switch(i) {
      case 1:
        this.isSelectedTotalReview = true;
        this.isSelectedOnlyReviewHaveImage = false;
        this.isSelectedOnlyReviewHaveComment = false;
        this.isSelectedOnlyReviewHaveFoodRecommend = false;
        this.getReviewList();
        break;
      case 2:
        this.isSelectedOnlyReviewHaveImage = true;
        this.isSelectedTotalReview = false;
        this.isSelectedOnlyReviewHaveComment = false;
        this.isSelectedOnlyReviewHaveFoodRecommend  = false;
        this.getReviewList();
        break;
      case 3:
        this.isSelectedOnlyReviewHaveComment = true;
        this.isSelectedTotalReview = false;
        this.isSelectedOnlyReviewHaveImage = false;
        this.isSelectedOnlyReviewHaveFoodRecommend = false;
        this.getReviewList();
        break;
      case 4:
        this.isSelectedOnlyReviewHaveFoodRecommend = true;
        this.isSelectedTotalReview = false;
        this.isSelectedOnlyReviewHaveComment = false;
        this.isSelectedOnlyReviewHaveImage = false;
        this.getReviewList();
        break;
    }
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
}
