import { ResponseModel } from '../../../models/response.model';
import { LocalStorageKey } from '../../../constant/local-storage-key.constant';
import { LocalStorageService } from '../../service/local-storage.service';
import { GetRestaurantListFromFilterRequestModel, GetRestaurantNearMeRequestModel, SetFavoriteRestaurantRequestModel } from '../../../models/reviewer-homepage.model';
import { ReviewerService } from '../reviewer.service';
import { Component, OnInit } from '@angular/core';
import { RestaurantCardListModel, RestaurantInfoListModel } from '../../../models/restaurant-info.model';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class ReviewerHomepageComponent implements OnInit {
  errorToggleFavorite: { isError: boolean, index: number };
  restaurantNearMeInfo: RestaurantInfoListModel;
  restaurantFromFilterInfo: RestaurantCardListModel = new RestaurantCardListModel();

  searchKeyword: string = "";
  categoryType: Array<number> = new Array<number>();
  awsS3Url = environment.awsS3Url;
  isShowNearMeList: boolean = true;
  isError: boolean;
  isLoading: boolean = true;
  skip: number = 0;
  lat: number;
  lng: number;

  constructor(
    private reviewerService: ReviewerService,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getUserCurrentLocation();
  }

  getUserCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.getRestaurantNearMeList();
      },
      (err) => {
        // User not allowed to get current position
        // set coordinates at Bangkok, Thailand
        this.lat = 13.736717;
        this.lng = 100.523186;
        this.getRestaurantNearMeList();
      },
      {timeout:10000}
    );
  }

  getRestaurantNearMeList() {
    let request = new GetRestaurantNearMeRequestModel();
    request.userId = this.localStorageService.get<string>(LocalStorageKey.userId) ?? '';
    request.latitude = this.lat;
    request.longitude = this.lng;
    request.skip = this.skip;
    request.take = 10;

    this.reviewerService.getRestaurantNearMeList(request)
      .subscribe((response: ResponseModel<RestaurantInfoListModel>) => {
      if (response?.status === 200) {
        this.restaurantNearMeInfo = response.data;
        this.isLoading = false;
      } else {
        this.isError = true;
        this.isLoading = false;
      }
    })
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
    request.skip = this.skip;
    request.take = 20;

    this.reviewerService.getRestaurantListFromFilter(request)
      .subscribe((response: ResponseModel<RestaurantCardListModel>) => {
      if (response?.status === 200) {
        this.restaurantFromFilterInfo = response.data;
        this.isLoading = false;
      } else {
        this.isError = true;
        this.isLoading = false;
      }
    })
  }

  onSearchRestaurant() {
    if (this.searchKeyword) {
      this.isLoading = true;
      this.isShowNearMeList = false;
      this.getRestaurantListRequestFromFilter();
    } else {
      this.isShowNearMeList = true;
    }
  }

  showtoasSuccess(text: string) {
    this.toastr.success(text, '', {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'increasing',
    });
  }

  showtoasError(text: string) {
    this.toastr.error(text, '', {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'increasing',
    });
  }

  toggleFavoriteRestaurant(item: any) {
    let requestModel = new SetFavoriteRestaurantRequestModel();
    requestModel.userId = this.localStorageService.get<string>(LocalStorageKey.userId) ?? '';
    requestModel.restaurantId = item.restaurantId;
    requestModel.isFavorite = item.isFavorite;

    this.reviewerService.setFavoriteRestaurant(requestModel)
      .subscribe((response: ResponseModel<boolean>) => {
      if (response?.status === 200) {
        this.showtoasSuccess(`${item.isFavorite? 'Favorite':'Disfavor'} '${item.restaurantName}' Successful`);
      } else {
        this.showtoasError(`Favorite ${item.restaurantName} Unsuccessful`);
      }
    })
  }
}
