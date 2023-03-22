import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GetReviewInfoRequest, ListReviewInfoModel, ReviewInfoModel } from 'src/models/review-info.model';
import { RestaurantService } from '../restaurant.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { LocalStorageKey } from 'src/constant/local-storage-key.constant';
import { ResponseModel } from 'src/models/response.model';
import { CategoryModel, ResBusinessHourModel, Restaurant, RestaurantDetailModel, SocialContactModel } from 'src/models/restaurant-info.model';
import { RestaurantType } from 'src/constant/restaurant-type.constant';
import { PaymentMethod } from 'src/constant/payment-method.constant';
import { environment } from 'src/environments/environment';
import { DeliveryType } from 'src/enum/delivery-type.enum';
import { DayList } from 'src/constant/day-list.constant';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  @Input() isLoading: boolean = true;

  Info: Restaurant;
  Reviews: Array<ReviewInfoModel>;
  SocialContact: Array<SocialContactModel>;
  Categories: Array<CategoryModel>;
  BusinessHours: Array<ResBusinessHourModel>;
  TotalReview: number = 0;
  Rating: number = 0;
  Star: Array<string>;
  RestaurantType: Array<string>;
  awsS3Url = environment.awsS3Url;
  userId: string;
  restaurantId: string;
  RecommendMenu: Array<string> = [];
  deliveryType = DeliveryType;

  options: google.maps.MapOptions;
  markerOptions: google.maps.MarkerOptions = {draggable: true};
  markerPositions: google.maps.LatLngLiteral;
  map: google.maps.Map;

  constructor(
    private restaurantService: RestaurantService,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.userId = this.localStorageService.get<string>(LocalStorageKey.userId) ?? '';
    this.restaurantId = this.localStorageService.get<string>(LocalStorageKey.restaurantId) ?? '';
    this.getRestaurantDetail();
    this.getRestaurantReviews();
  }


  getRestaurantDetail() {
    this.restaurantService.getRestaurantDetail(this.restaurantId).subscribe(
      (response: ResponseModel<RestaurantDetailModel>) => {
        if (response && response?.status === 200) {
          this.Info = response.data.restaurantInfo;
          this.SocialContact = response.data.socialContact;
          this.Categories = response.data.categories;
          this.BusinessHours = response.data.businessHours;
          this.options = {
            center: {
              lat: response.data.restaurantInfo.latitude,
              lng: response.data.restaurantInfo.longitude
            },
            zoom: 15,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          };
          this.markerPositions = ({lat: response.data.restaurantInfo.latitude, lng: response.data.restaurantInfo.longitude})
          this.setMarkerPosition()
        }
    })
  }

  getRestaurantReviews() {
    this.restaurantService.getRestaurantReviews(this.restaurantId).subscribe(
      (response: ResponseModel<ListReviewInfoModel>) => {
        if (response && response?.status === 200) {
          this.Reviews = response.data.reviews;
          
          if (this.Reviews.length != 0) {
            this.TotalReview = this.Reviews.length
            let ratingCount = 0;
            
            this.Reviews.forEach(x => {
              ratingCount += x.rating
              this.RecommendMenu = (x.foodRecommendList != null)? [ ...this.RecommendMenu, ...(x.foodRecommendList)] : this.RecommendMenu
            });
            this.RecommendMenu = [...new Set(this.RecommendMenu)];
            this.Rating = ratingCount/this.Reviews.length
          }
          this.isLoading = false;
        }
        else {
          this.Reviews = [];
          this.isLoading = false;
        }
    })
  }

  getRestaurantType(type: number) {
    switch (type) {
      case 1:
        return [RestaurantType.find((i:any) => i.id === 1)?.name]
      case 2:
        return [RestaurantType.find((i:any) => i.id === 1)?.name]
      case 3:
        return [RestaurantType.find((i:any) => i.id === 1)?.name , RestaurantType.find((i:any) => i.id === 2)?.name]
      default:
        return [];
    }
  }

  getPaymentMethod(method: number) {
    switch (method) {
      case 1:
        return PaymentMethod.find((i:any) => i.id === 1)?.name;
      case 2:
        return PaymentMethod.find((i:any) => i.id === 2)?.name;
      case 3:
        return PaymentMethod.find((i:any) => i.id === 3)?.name;
      case 4:
        return PaymentMethod.find((i:any) => i.id === 4)?.name;
      default:
        return null;
    }
  }

  getSocialContactValue(type: number) {
    switch (type) {
      case 1:
        return this.SocialContact.find((i:SocialContactModel) => i.socialType === 1)?.contactValue;
      case 2:
        return this.SocialContact.find((i:any) => i.socialType === 2)?.contactValue;
      case 3:
        return this.SocialContact.find((i:any) => i.socialType === 3)?.contactValue;
      case 4:
        return this.SocialContact.find((i:any) => i.socialType === 4)?.contactValue;
      default:
        return "";
    }
  }

  getBuHourString(day: number) {
    switch (day) {
      case 1:
        return DayList.find((i:any) => i.id === 1)?.name
      case 2:
        return DayList.find((i:any) => i.id === 2)?.name
      case 3:
        return DayList.find((i:any) => i.id === 3)?.name
      case 4:
        return DayList.find((i:any) => i.id === 4)?.name
      case 5:
        return DayList.find((i:any) => i.id === 5)?.name
      case 6:
        return DayList.find((i:any) => i.id === 6)?.name
      case 7:
        return DayList.find((i:any) => i.id === 7)?.name
      case 8:
        return DayList.find((i:any) => i.id === 8)?.name
      default:
        return "";
    }
  }

  setMarkerPosition() {
    this.markerPositions = {
      lat: this.Info.latitude,
      lng: this.Info.longitude
    }
  }

}
