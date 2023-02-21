import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GetReviewInfoRequest, ReviewInfoModel } from 'src/models/review-info.model';
import { environment } from 'src/environments/environment';
import { ResponseModel } from 'src/models/response.model';
import { RestaurantDetailModel } from 'src/models/restaurant-info.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  sub: any;

  constructor(private http: HttpClient) { }

  getRestaurantDetail(model: GetReviewInfoRequest) {
    const url = `${environment.kinMaiApi}/Restaurant/GetRestaurantDetail?userId=${model.userId}&restaurantId=${model.restaurantId}`;
    this.sub = this.http.get<ResponseModel<RestaurantDetailModel>>(url);
    return this.sub;
  }

  getRestaurantReviews(restaurantId: string) {
    const url = `${environment.kinMaiApi}/Restaurant/GetRestaurantReviews?restaurantId=${restaurantId}`;
    this.sub = this.http.get<ResponseModel<Array<ReviewInfoModel>>>(url);
    return this.sub;
  }
  
}
