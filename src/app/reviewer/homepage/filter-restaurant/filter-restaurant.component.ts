import { LocalStorageKey } from 'src/constant/local-storage-key.constant';
import { DeliveryType } from 'src/enum/delivery-type.enum';
import { FilterRestaurantRequest } from './../../../../models/reviewer-homepage.model';
import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { DrinkAndDessertCategory, FoodCategory } from 'src/constant/food-category.constant';
import { FilterRestaurantType } from 'src/enum/filter-restaurant.enum';
import { environment } from 'src/environments/environment';
import { RestaurantCardInfoModel, RestaurantCardListModel } from 'src/models/restaurant-info.model';
import { ToggleFavoriteRestaurantRequestModel } from 'src/models/toggle-favorite-request.model';
import { ReviewerService } from '../../reviewer.service';
import { PaymentMethod } from 'src/enum/payment-method.enum';
import { ModalReviewComponent } from '../../modal-review/modal-review.component';
import { Router } from '@angular/router';
import { PageLink } from 'src/constant/path-link.constant';
import { ComponentName } from 'src/enum/component-name.enum';

@Component({
  selector: 'app-filter-restaurant',
  templateUrl: './filter-restaurant.component.html',
  styleUrls: ['./filter-restaurant.component.scss']
})
export class FilterRestaurantComponent implements OnInit {
  @Input() skip: number = 0;
  @Input() isLoading: boolean = true;
  @Input() searchKeyword: string = "";
  @Output() setFavoriteRestaurant: EventEmitter<ToggleFavoriteRestaurantRequestModel> = new EventEmitter<ToggleFavoriteRestaurantRequestModel>();
  @Output() getAnotherRestaurantEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() setFilterRequest: EventEmitter<FilterRestaurantRequest> = new EventEmitter<FilterRestaurantRequest>();
  @ViewChild('reviewModal') reviewModal: ModalReviewComponent;

  restaurantInfoList: Array<RestaurantCardInfoModel>;
  restaurantInfo: RestaurantCardListModel;
  foodCategories: Array<{ id: number, name: string, isSelected?: boolean }>;
  selectedCategory: Array<number> = new Array<number>();
  categoryType: Array<number> = new Array<number>();
  deliveryType: Array<number> = new Array<number>();
  filterType = FilterRestaurantType;
  reviewRestaurantIndex: number;
  isSelectedOpenRestaurant: boolean = true;
  isSelectedQRCode: boolean = false;
  isSelectedDelivery: boolean = false;
  isSelectedPickup: boolean = false;
  isCollapsedFilter: boolean = false;
  awsS3Url = environment.awsS3Url;
  totalRestaurant: number = 0;
  restaurantCumulativeCount: number = 0;
  ownerRestaurantId: string;
  userId: string;
  isError: boolean;
  isOpen: boolean;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.userId = this.localStorageService.get<string>(LocalStorageKey.userId) ?? '';
    this.ownerRestaurantId = this.localStorageService.get<string>(LocalStorageKey.restaurantId) ?? '';
    this.isCollapsedFilter = (window.innerWidth < 992);
    this.selectedCategory = new Array<number>();
    this.foodCategories = [...FoodCategory, ...DrinkAndDessertCategory];
    this.foodCategories.map(x => x.isSelected = false);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isCollapsedFilter = (window.innerWidth < 992);
  }

  @Input()
  set errorToggleFavorite(item: { isError: boolean, index: number }) {
    if (item?.isError) {
      this.restaurantInfoList[item.index].isFavorite = !this.restaurantInfoList[item.index].isFavorite;
    }
  }

  @Input()
  set randomCategoryType(category: number) {
    if (category) {
      this.selectCategoryType(category, category-1);
    }
  }

  @Input()
  set restaurantList(item: RestaurantCardListModel) {
    if (item) {
      this.restaurantInfo = item;
      this.restaurantInfoList = item.restaurantInfo;
      this.restaurantCumulativeCount = item.restaurantCumulativeCount;
      this.totalRestaurant = item.totalRestaurant;
    }
  }

  toggleFavoriteRestaurant(restaurantId: string, restaurantName: string, isFavorite: boolean, index: number) {
    this.restaurantInfoList[index].isFavorite = isFavorite;

    let eventInfo = new ToggleFavoriteRestaurantRequestModel();
    eventInfo.restaurantId = restaurantId;
    eventInfo.restaurantName = restaurantName;
    eventInfo.isFavorite = isFavorite;
    eventInfo.index = index;
    this.setFavoriteRestaurant.emit(eventInfo);
  }

  selectCategoryType(type: number, index: number) {
    if (this.selectedCategory.includes(type)) {
      let indexToRemove = this.selectedCategory.indexOf(type);
      this.foodCategories[index].isSelected = false;
      this.selectedCategory.splice(indexToRemove, 1);
    } else {
      this.selectedCategory.push(type);
      this.foodCategories[index].isSelected = true;
    }
    this.setFilterRestaurantRequest();
  }

  selectFilterType(type: number) {
    switch(type) {
      case FilterRestaurantType.IsOpen:
        this.isSelectedOpenRestaurant = !this.isSelectedOpenRestaurant;
        break;
      case FilterRestaurantType.QRCode:
        this.isSelectedQRCode = !this.isSelectedQRCode;
        break;
      case FilterRestaurantType.Delivery:
        if (this.isSelectedDelivery) {
          let i = this.deliveryType.indexOf(DeliveryType.Delivery);
          this.deliveryType.splice(i, 1);
          this.isSelectedDelivery = false;
        } else {
          this.deliveryType.push(DeliveryType.Delivery)
          this.isSelectedDelivery = true;
        }
        break;
      case FilterRestaurantType.PickUp:
        if (this.isSelectedPickup) {
          let i = this.deliveryType.indexOf(DeliveryType.PickUp);
          this.deliveryType.splice(i, 1);
          this.isSelectedPickup = false;
        } else {
          this.deliveryType.push(DeliveryType.PickUp)
          this.isSelectedPickup = true;
        }
        break;
    }
    this.setFilterRestaurantRequest();
  }

  setFilterRestaurantRequest() {
    let request = new FilterRestaurantRequest();
    request.isOpen = this.isSelectedOpenRestaurant;
    request.categoryType = this.selectedCategory;
    request.deliveryType = this.deliveryType;
    request.paymentMethod = this.isSelectedQRCode
      ? [PaymentMethod.QRCode]
      : new Array<number>();
    this.setFilterRequest.emit(request);
  }

  resetFilter() {
    this.selectedCategory = new Array<number>();
    this.foodCategories.map(x => x.isSelected = false);
    this.isSelectedOpenRestaurant = false;
    this.isSelectedQRCode = false;
    this.isSelectedDelivery = false;
    this.isSelectedPickup = false;
    this.setFilterRestaurantRequest();
  }

  addReviewRestaurant(restaurantId: string, restaurantName: string, restaurantIndex: number) {
    this.reviewRestaurantIndex = restaurantIndex;
    this.reviewModal.openReviewModal(true, false, restaurantId, restaurantName, ComponentName.FilterRestaurantComponent);
  }

  seeExistReviewRestaurant(restaurantId: string, restaurantName: string, restaurantIndex: number) {
    this.reviewRestaurantIndex = restaurantIndex;
    this.reviewModal.openReviewModal(false, false, restaurantId, restaurantName, ComponentName.FilterRestaurantComponent);
  }

  updateReviewStatus(event: any) {
    if (event?.componentName == ComponentName.FilterRestaurantComponent && event?.status) {
      this.restaurantInfoList[this.reviewRestaurantIndex].isReview = true;
    }
  }

  routeToRestaurantDetail(restaurantId: string) {
    this.router.navigate([PageLink.reviewer.restaurantDetail], {
      queryParams: { 'restaurantId': restaurantId }
    });
  }
}
