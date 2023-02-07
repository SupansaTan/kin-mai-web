import { RestaurantCardListModel, RestaurantInfoListModel } from './../../models/restaurant-info.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseModel } from 'src/models/response.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GetRestaurantListFromFilterRequestModel, GetRestaurantNearMeRequestModel, SetFavoriteRestaurantRequestModel } from './../../models/reviewer-homepage.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewerService {
  sub: any;
  selectedCategoryType: Array<number> = new Array<number>();

  constructor(private http: HttpClient) { }

  setSelectedCategoryType(category: Array<number>) {
    this.selectedCategoryType = [...category, ...this.selectedCategoryType];
  }

  getSelectedCategoryType() {
    return this.selectedCategoryType;
  }

  getRestaurantNearMeList(model: GetRestaurantNearMeRequestModel) {
    const url = `${environment.kinMaiApi}/Reviewer/GetRestaurantNearMeList?userId=${model.userId}&latitude=${model.latitude}\n
                &longitude=${model.longitude}&skip=${model.skip}&take=${model.take}`;
    this.sub = this.http.get<ResponseModel<RestaurantInfoListModel>>(url);
    return this.sub;
  }

  getRestaurantListFromFilter(model: GetRestaurantListFromFilterRequestModel) {
    const url = `${environment.kinMaiApi}/Reviewer/GetRestaurantListFromFilter`;
    let params = new HttpParams();
    params = params.append('userId', model.userId);
    params = params.append('latitude', model.latitude);
    params = params.append('longitude', model.longitude);
    params = params.append('skip', model.skip);
    params = params.append('take', model.take);
    params = params.append('keywords', model.keywords);
    params = params.append('categoryType', model.categoryType.join(', '));
    params = params.append('isOpen', model.isOpen);
    params = params.append('deliveryType', model.deliveryType.join(', '));
    params = params.append('paymentMethod', model.paymentMethod.join(', '));

    this.sub = this.http.get<ResponseModel<RestaurantCardListModel>>(url, { params: params });
    return this.sub;
  }

  setFavoriteRestaurant(model: SetFavoriteRestaurantRequestModel) {
    const url = `${environment.kinMaiApi}/Reviewer/SetFavoriteRestaurant`;
    this.sub = this.http.post<ResponseModel<boolean>>(url, model);
    return this.sub;
  }
}
