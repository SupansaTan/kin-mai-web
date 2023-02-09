import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { LocalStorageKey } from 'src/constant/local-storage-key.constant';
import { environment } from 'src/environments/environment';
import { ResponseModel } from 'src/models/response.model';
import { RestaurantCardInfoModel, RestaurantCardListModel } from 'src/models/restaurant-info.model';
import { GetRestaurantListFromFilterRequestModel } from 'src/models/reviewer-homepage.model';
import { ToggleFavoriteRestaurantRequestModel } from 'src/models/toggle-favorite-request.model';
import { ReviewerService } from '../../reviewer.service';

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

  restaurantInfoList: Array<RestaurantCardInfoModel>;
  restaurantInfo: RestaurantCardListModel;
  categoryType: Array<number> = new Array<number>();
  awsS3Url = environment.awsS3Url;
  totalRestaurant: number = 0;
  restaurantCumulativeCount: number = 0;
  isError: boolean;
  isOpen: boolean;

  constructor(
    private reviewerService: ReviewerService,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
  }

  @Input()
  set errorToggleFavorite(item: { isError: boolean, index: number }) {
    if (item?.isError) {
      this.restaurantInfoList[item.index].isFavorite = !this.restaurantInfoList[item.index].isFavorite;
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
}
