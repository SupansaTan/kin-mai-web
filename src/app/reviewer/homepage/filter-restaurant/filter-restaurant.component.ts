import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { LocalStorageKey } from 'src/constant/local-storage-key.constant';
import { environment } from 'src/environments/environment';
import { ResponseModel } from 'src/models/response.model';
import { RestaurantCardInfoModel, RestaurantCardListModel } from 'src/models/restaurant-info.model';
import { GetRestaurantListFromFilterRequestModel } from 'src/models/reviewer-homepage.model';
import { ReviewerService } from '../../reviewer.service';

@Component({
  selector: 'app-filter-restaurant',
  templateUrl: './filter-restaurant.component.html',
  styleUrls: ['./filter-restaurant.component.scss']
})
export class FilterRestaurantComponent implements OnInit {
  restaurantInfoList: Array<RestaurantCardInfoModel>;
  restaurantInfo: RestaurantCardListModel;
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
    private reviewerService: ReviewerService,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
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
        this.restaurantInfo = response.data;
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
