import { LocalStorageService } from 'src/app/service/local-storage.service';
import { ToggleFavoriteRestaurantRequestModel } from './../../../../models/toggle-favorite-request.model';
import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RestaurantInfoItemModel, RestaurantInfoListModel } from 'src/models/restaurant-info.model';
import { Router } from '@angular/router';
import { PageLink } from 'src/constant/path-link.constant';
import { ModalReviewComponent } from '../../modal-review/modal-review.component';
import { LocalStorageKey } from 'src/constant/local-storage-key.constant';

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
  @ViewChild('reviewModal') reviewModal: ModalReviewComponent;

  restaurantInfoList: Array<RestaurantInfoItemModel>;
  restaurantCumulativeCount: number = 0;
  totalRestaurant: number = 0;
  awsS3Url = environment.awsS3Url;
  userId: string;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.userId = this.localStorageService.get<string>(LocalStorageKey.userId) ?? '';
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

  addReviewRestaurant(restaurantId: string, restaurantName: string) {
    this.reviewModal.openReviewModal(true, false, restaurantId, restaurantName);
  }

  seeExistReviewRestaurant(restaurantId: string, restaurantName: string) {
    this.reviewModal.openReviewModal(false, false, restaurantId, restaurantName);
  }
}
