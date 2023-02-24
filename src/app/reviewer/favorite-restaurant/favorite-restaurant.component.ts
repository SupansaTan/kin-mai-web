import { Router } from '@angular/router';
import { LocalStorageService } from './../../service/local-storage.service';
import { ReviewerService } from './../reviewer.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GetFavoriteRestaurantList } from 'src/models/favorite-restaurant.model';
import { SetFavoriteRestaurantRequestModel } from 'src/models/reviewer-homepage.model';
import { ToggleFavoriteRestaurantRequestModel } from 'src/models/toggle-favorite-request.model';
import { LocalStorageKey } from 'src/constant/local-storage-key.constant';
import { ResponseModel } from 'src/models/response.model';
import { ToastrService } from 'ngx-toastr';
import { PageLink } from 'src/constant/path-link.constant';

@Component({
  selector: 'app-favorite-restaurant',
  templateUrl: './favorite-restaurant.component.html',
  styleUrls: ['./favorite-restaurant.component.scss']
})
export class FavoriteRestaurantComponent implements OnInit {
  restaurantList: Array<GetFavoriteRestaurantList>;
  awsS3Url = environment.awsS3Url;
  isLoading: boolean = true;

  constructor(
    private reviewerService: ReviewerService,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
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

  routeToRestaurantDetail(restaurantId: string) {
    this.router.navigate([PageLink.reviewer.restaurantDetail, {
      restaurantId: restaurantId,
    }]);
  }

  toggleFavoriteRestaurant(restaurantId: string, index: number) {
    let restaurant = this.restaurantList[index];

    let requestModel = new SetFavoriteRestaurantRequestModel();
    requestModel.userId = this.localStorageService.get<string>(LocalStorageKey.userId) ?? '';
    requestModel.restaurantId = restaurantId;
    requestModel.isFavorite = false;

    this.reviewerService.setFavoriteRestaurant(requestModel)
      .subscribe((response: ResponseModel<boolean>) => {
      if (response?.status === 200) {
        this.restaurantList.splice(index, 1);
        this.showtoasSuccess(`Disfavor '${restaurant.restaurantName}' Successful`);
      } else {
        this.showtoasError(`Disfavor ${restaurant.restaurantName} Unsuccessful`);
      }
    })
  }
}
