import { AddReviewRequestModel } from './../../models/add-review.model';
import { RestaurantCardListModel, RestaurantInfoListModel } from './../../models/restaurant-info.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseModel } from 'src/models/response.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GetRestaurantListFromFilterRequestModel, GetRestaurantNearMeRequestModel, SetFavoriteRestaurantRequestModel } from './../../models/reviewer-homepage.model';
import { GetReviewInfoRequest, ReviewInfoModel, UpdateReviewInfoRequest } from 'src/models/review-info.model';
import { GetRestaurantDetailModel, GetRestaurantDetailRequestModel } from 'src/models/restaurant-detail.model';
import { GetReviewInfoFilterModel, GetReviewInfoListModel } from 'src/models/get-review-info.model';

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
    params = params.append('isOpen', model.isOpen);

    model.categoryType.forEach((x) => {
      params = params.append('categoryType', x);
    });
    model.deliveryType.forEach((x) => {
      params = params.append('deliveryType', x);
    });
    model.paymentMethod.forEach((x) => {
      params = params.append('paymentMethod', x);
    });

    this.sub = this.http.get<ResponseModel<RestaurantCardListModel>>(url, { params: params });
    return this.sub;
  }

  getRestaurantDetail(model: GetRestaurantDetailRequestModel) {
    const url = `${environment.kinMaiApi}/Reviewer/GetRestaurantDetail`;
    let params = new HttpParams();
    params = params.append('userId', model.userId);
    params = params.append('latitude', model.latitude);
    params = params.append('longitude', model.longitude);
    params = params.append('restaurantId', model.restaurantId);
    this.sub = this.http.get<ResponseModel<GetRestaurantDetailModel>>(url, { params: params });
    return this.sub;
  }

  setFavoriteRestaurant(model: SetFavoriteRestaurantRequestModel) {
    const url = `${environment.kinMaiApi}/Reviewer/SetFavoriteRestaurant`;
    this.sub = this.http.post<ResponseModel<boolean>>(url, model);
    return this.sub;
  }

  addReviewRestaurant(model: AddReviewRequestModel) {
    const url = `${environment.kinMaiApi}/Reviewer/AddReviewRestaurant`;
    let formData = new FormData();
    Object.entries(model).forEach(([k, v]) => {
      if (['ReviewLabelList', 'FoodRecommendList', 'ImageFiles'].includes(k)) {
        v.forEach((item: any) => {
          formData.append(k, (item instanceof Number)? item.toString(): item);
        });
      }
      else {
        formData.append(k, (v instanceof Number)? v.toString(): v);
      }
    });

    this.sub = this.http.post<ResponseModel<boolean>>(url, formData);
    return this.sub;
  }

  getReviewInfo(model: GetReviewInfoRequest) {
    const url = `${environment.kinMaiApi}/Reviewer/GetReviewInfo?userId=${model.userId}&restaurantId=${model.restaurantId}`;
    this.sub = this.http.get<ResponseModel<ReviewInfoModel>>(url);
    return this.sub;
  }

  getRestaurantReviewList(model: GetReviewInfoFilterModel) {
    const url = `${environment.kinMaiApi}/Reviewer/GetRestaurantReviewList`;
    let params = new HttpParams();
    params = params.append('restaurantId', model.restaurantId);
    params = params.append('keywords', model.keywords);
    params = params.append('rating', model.rating);
    params = params.append('isOnlyReviewHaveImage', model.isOnlyReviewHaveImage);
    params = params.append('isOnlyReviewHaveComment', model.isOnlyReviewHaveComment);
    params = params.append('isOnlyReviewHaveFoodRecommend', model.isOnlyReviewHaveFoodRecommend);
    this.sub = this.http.get<ResponseModel<GetReviewInfoListModel>>(url, { params: params });
    return this.sub;
  }

  updateReviewInfo(model: UpdateReviewInfoRequest) {
    const url = `${environment.kinMaiApi}/Reviewer/UpdateReviewInfo`;
    let formData = new FormData();
    Object.entries(model).forEach(([k, v]) => {
      if (['ReviewLabelList', 'FoodRecommendList', 'NewImageFile', 'RemoveImageLink'].includes(k)) {
        v.forEach((item: any) => {
          formData.append(k, (item instanceof Number)? item.toString(): item);
        });
      }
      else {
        formData.append(k, (v instanceof Number)? v.toString(): v);
      }
    });
    this.sub = this.http.put<ResponseModel<boolean>>(url, formData);
    return this.sub;
  }
}
