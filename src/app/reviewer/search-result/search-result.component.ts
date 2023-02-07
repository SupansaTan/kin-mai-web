import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendarIslamicUmalqura } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { LocalStorageKey } from 'src/constant/local-storage-key.constant';
import { environment } from 'src/environments/environment';
import { ResponseModel } from 'src/models/response.model';
import { RestaurantCardInfoModel, RestaurantCardListModel } from 'src/models/restaurant-info.model';
import { GetRestaurantListFromFilterRequestModel } from 'src/models/reviewer-homepage.model';
import { ReviewerService } from '../reviewer.service';

export interface RestaurantInfo {
  Title: string,
  PriceRate: Array<number>,
  Rating: number,
  TotalReview: number,
  Photo: Array<string>,
  Status: string
  IsFav: boolean,
  Types: number,
  Delivery: Array<number>,
  Payments: Array<number>,
  MyReview: {
    Star: number,
    Comment: string,
    Photo: Array<string>,
    RecommendMenu: Array<string>,
  } | null
}

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchRestaurantComponent implements OnInit {

  RestaurantList: Array<RestaurantInfo> = [
    {
      Title: 'ตำแซ่บ',
      PriceRate: [60,200],
      Rating: 3.5,
      TotalReview: 51,
      Photo: [ "../../../assets/image/somtam.jpg", "../../../assets/image/food-real.jpg"],
      Status: "อยู่ใกล้ๆประตูหลังมอเลย แวะมาลองกันได้นะ",
      IsFav: false,
      Types: 1,
      Delivery: [1] ,
      Payments: [1],
      MyReview: {
        Star: 5,
        Comment: "อร่อยจ้า",
        Photo: ["../../../assets/image/somtam.jpg"],
        RecommendMenu: ["ตำไทย","ตำปลาร้า"]
      }
    },
    {
      Title: 'ตำแซ่บมากกว่า',
      PriceRate: [70,300],
      Rating: 4,
      TotalReview: 60,
      Photo: [ "../../assets/image/somtam.jpg", "../../../assets/image/food-real.jpg"],
      Status: "อยู่ใกล้ๆประตูหลังมอเลย เลยร้านตำแซ่บมานิดนึง",
      IsFav: true,
      Types: 2,
      Delivery: [2],
      Payments: [2],
      MyReview: null
    },
    {
      Title: 'ส้มตำ',
      PriceRate: [80,200],
      Rating: 4.5,
      TotalReview: 50,
      Photo: [ "../../assets/image/somtam.jpg", "../../../assets/image/food-real.jpg"],
      Status: "ส้มตำจ้า",
      IsFav: true,
      Types: 2,
      Delivery: [1,2],
      Payments: [1,2],
      MyReview: null
    },
  ]

  private sub: any;

  isReview: boolean = false
  restaurantInfoList: Array<RestaurantCardInfoModel>;
  restaurantNearMeInfo: RestaurantCardListModel;
  searchKeyword: string = "";
  categoryType: Array<number> = new Array<number>();
  awsS3Url = environment.awsS3Url;
  totalRestaurant: number = 0;
  restaurantCumulativeCount: number = 0;
  keywords: string;
  isError: boolean;
  isLoading: boolean = true;
  isOpen: boolean;
  skip: number = 0;
  lat: number;
  lng: number;

  constructor(
    private route: ActivatedRoute,
    private reviewerService: ReviewerService,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.isOpen = params['isOpen'];
      this.keywords = params['keywords'];

      if (this.isOpen && this.keywords) {
        // to do : set keywoords and isOpen to form value
      }
    });
    this.getUserCurrentLocation();
  }

  getUserCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.getRestaurantListRequestFromFilter();
      },
      (err) => {
        // User not allowed to get current position
        // set coordinates at Bangkok, Thailand
        this.lat = 13.736717;
        this.lng = 100.523186;
        this.getRestaurantListRequestFromFilter();
      },
      {timeout:10000}
    );
  }

  toggleFav(index:any) {
    this.RestaurantList[index].IsFav = !this.RestaurantList[index].IsFav
  }

  getRestaurantListRequestFromFilter() {
    let request = new GetRestaurantListFromFilterRequestModel();
    request.userId = this.localStorageService.get<string>(LocalStorageKey.userId) ?? '';
    request.latitude = this.lat;
    request.longitude = this.lng;
    request.isOpen = true;
    request.categoryType = this.categoryType;
    request.deliveryType = new Array<number>();
    request.keywords = this.searchKeyword;
    request.paymentMethod = new Array<number>();
    request.skip = 0;
    request.take = 20;

    this.reviewerService.getRestaurantListFromFilter(request)
      .subscribe((response: ResponseModel<RestaurantCardListModel>) => {
      if (response?.status === 200) {
        this.restaurantNearMeInfo = response.data;
        this.restaurantInfoList = response.data.restaurantInfo;
        this.totalRestaurant = response.data.totalRestaurant;
        this.restaurantCumulativeCount = response.data.restaurantCumulativeCount;
        this.isLoading = false;
      } else {
        this.isError = true;
        this.isLoading = false;
      }
    })
  }
}
