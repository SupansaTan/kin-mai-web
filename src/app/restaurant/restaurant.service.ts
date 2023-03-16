import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UpdateReviewReplyRequest, ReviewInfoModel } from 'src/models/review-info.model';
import { environment } from 'src/environments/environment';
import { ResponseModel } from 'src/models/response.model';
import { RestaurantDetailModel, RestaurantUpdateModel } from 'src/models/restaurant-info.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  sub: any;

  constructor(private http: HttpClient) { }

  getRestaurantDetail(restaurantId: string) {
    const url = `${environment.kinMaiApi}/Restaurant/GetRestaurantDetail?restaurantId=${restaurantId}`;
    this.sub = this.http.get<ResponseModel<RestaurantDetailModel>>(url);
    return this.sub;
  }

  getRestaurantReviews(restaurantId: string) {
    const url = `${environment.kinMaiApi}/Restaurant/GetRestaurantReviews?restaurantId=${restaurantId}`;
    this.sub = this.http.get<ResponseModel<Array<ReviewInfoModel>>>(url);
    return this.sub;
  }

  updateReplyReviewInfo(model: UpdateReviewReplyRequest) {
    const url = `${environment.kinMaiApi}/Restaurant/UpdateReplyReviewInfo`;
    this.sub = this.http.put<ResponseModel<boolean>>(url, model);
    return this.sub;
  }

  updateRestaurantDetail(model: RestaurantUpdateModel) {
    const url = `${environment.kinMaiApi}/Restaurant/UpdateRestaurantDetail`;
    this.sub = this.http.put<ResponseModel<boolean>>(url, model);
    return this.sub;
  }

}
