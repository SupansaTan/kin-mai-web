import { ResponseModel } from '../../../models/response.model';
import { LocalStorageKey } from '../../../constant/local-storage-key.constant';
import { LocalStorageService } from '../../service/local-storage.service';
import { FilterRestaurantRequest, GetRestaurantListFromFilterRequestModel, GetRestaurantNearMeRequestModel, SetFavoriteRestaurantRequestModel } from '../../../models/reviewer-homepage.model';
import { ReviewerService } from '../reviewer.service';
import { Component, OnInit } from '@angular/core';
import { RestaurantCardListModel, RestaurantInfoListModel } from '../../../models/restaurant-info.model';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class ReviewerHomepageComponent implements OnInit {
  errorToggleFavorite: { isError: boolean, index: number };
  restaurantNearMeInfo: RestaurantInfoListModel;
  restaurantFromFilterInfo: RestaurantCardListModel = new RestaurantCardListModel();
  filterRestaurantRequest: FilterRestaurantRequest;

  private sub: any;
  searchKeyword: string = "";
  awsS3Url = environment.awsS3Url;
  isShowNearMeList: boolean = true;
  isError: boolean;
  isLoading: boolean = true;
  categoryType: number;
  categoryTypeParam: number;
  skip: number = 0;
  lat: number;
  lng: number;

  constructor(
    private reviewerService: ReviewerService,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.categoryTypeParam = params['categoryType'];
      if (this.categoryTypeParam) {
        this.isShowNearMeList = false;
      }
    });
    this.initComponent();
  }

  async initComponent() {
    const getCoordinate = await this.getUserCurrentLocation();
    this.isLoading = false;

    if (this.isShowNearMeList) {
      this.initFilterRequest();
      this.getRestaurantNearMeList();
    } else {
      this.categoryType = this.categoryTypeParam;
    }
  }

  initFilterRequest() {
    this.filterRestaurantRequest = new FilterRestaurantRequest();
    this.filterRestaurantRequest.isOpen = true;
    this.filterRestaurantRequest.categoryType = [];
    this.filterRestaurantRequest.deliveryType = new Array<number>();
    this.filterRestaurantRequest.paymentMethod = new Array<number>();
  }

  getUserCurrentLocation() {
    return new Promise<boolean>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.localStorageService.set(LocalStorageKey.latitude, this.lat);
          this.localStorageService.set(LocalStorageKey.longitude, this.lng);
          resolve(true);
        },
        (err) => {
          // User not allowed to get current position
          // set coordinates at Bangkok, Thailand
          this.lat = 13.736717;
          this.lng = 100.523186;
          this.localStorageService.set(LocalStorageKey.latitude, this.lat);
          this.localStorageService.set(LocalStorageKey.longitude, this.lng);
          resolve(true);
        },
        {timeout:10000}
      );
    });
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
    },
    (error: any) => {
      this.isError = true;
      this.isLoading = false;
    })
  }

  getRestaurantListRequestFromFilter() {
    let request = new GetRestaurantListFromFilterRequestModel();
    request.userId = this.localStorageService.get<string>(LocalStorageKey.userId) ?? '';
    request.latitude = this.lat;
    request.longitude = this.lng;
    request.isOpen = this.filterRestaurantRequest.isOpen;
    request.categoryType = this.filterRestaurantRequest.categoryType;
    request.deliveryType = this.filterRestaurantRequest.deliveryType;
    request.keywords = this.searchKeyword;
    request.paymentMethod = this.filterRestaurantRequest.paymentMethod;
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
    },
    (error: any) => {
      this.isError = true;
      this.isLoading = false;
    })
  }

  onSearchRestaurant() {
    if (
      this.searchKeyword
      || this.filterRestaurantRequest.categoryType?.length
      || this.filterRestaurantRequest.deliveryType?.length
      || this.filterRestaurantRequest.paymentMethod?.length
    ) {
      this.isLoading = true;
      this.isShowNearMeList = false;
      this.getRestaurantListRequestFromFilter();
    } else {
      this.isShowNearMeList = true;
      this.getRestaurantNearMeList();
    }
  }

  clearSearch() {
    this.searchKeyword = "";
    this.onSearchRestaurant();
  }

  setFilterRestaurant(item: any) {
    this.filterRestaurantRequest = item;
    this.getRestaurantListRequestFromFilter();
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

        if (this.isShowNearMeList) {
          this.getRestaurantNearMeList();
        } else {
          this.getRestaurantListRequestFromFilter();
        }
      } else {
        this.showtoasError(`Favorite ${item.restaurantName} Unsuccessful`);
      }
    })
  }
}
