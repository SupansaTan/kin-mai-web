import { ToggleFavoriteRestaurantRequestModel } from './../../../../models/toggle-favorite-request.model';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RestaurantInfoItemModel, RestaurantInfoListModel } from 'src/models/restaurant-info.model';
import { Router } from '@angular/router';
import { PageLink } from 'src/constant/path-link.constant';

@Component({
  selector: 'app-nearly-restaurant',
  templateUrl: './nearly-restaurant.component.html',
  styleUrls: ['./nearly-restaurant.component.scss']
})
export class NearlyRestaurantComponent implements OnInit {
  @Input() skip: number = 0;
  @Input() isLoading: boolean = true;
  @Output() setFavoriteRestaurant: EventEmitter<ToggleFavoriteRestaurantRequestModel> = new EventEmitter<ToggleFavoriteRestaurantRequestModel>();
  @Output() getAnotherRestaurantEvent: EventEmitter<number> = new EventEmitter<number>();

  restaurantInfoList: Array<RestaurantInfoItemModel>;
  restaurantCumulativeCount: number = 0;
  totalRestaurant: number = 0;
  awsS3Url = environment.awsS3Url;

  constructor(
    private router: Router
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
  set restaurantList(item: RestaurantInfoListModel) {
    if (item) {
      this.restaurantInfoList = item.restaurantInfo;
      this.restaurantCumulativeCount = item.restaurantCumulativeCount;
      this.totalRestaurant = item.totalRestaurant;
    }
  }

  toggleFavoriteRestaurant(restaurantId: string, restaurantName: string, isFavorite: boolean, index: number) {
    this.restaurantInfoList[index].isFavorite = !isFavorite;

    let eventInfo = new ToggleFavoriteRestaurantRequestModel();
    eventInfo.restaurantId = restaurantId;
    eventInfo.restaurantName = restaurantName;
    eventInfo.isFavorite = isFavorite;
    eventInfo.index = index;
    this.setFavoriteRestaurant.emit(eventInfo);
  }

  routeToRestaurantDetail(restaurantId: string) {
    this.router.navigate([PageLink.reviewer.restaurantDetail, {
      restaurantId: restaurantId,
    }]);
  }
}
