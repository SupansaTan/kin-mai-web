import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GetReviewInfoRequest } from 'src/models/review-info.model';
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
    // const url = `${environment.kinMaiApi}/Restaurant/GetRestaurantDetail?userId=${"3c52c576-f9af-41e8-8220-f269e1a196bd"}&restaurantId=${"5bba1de4-a671-441e-a24b-6220ee63936f"}`;
    this.sub = this.http.get<ResponseModel<RestaurantDetailModel>>(url);
    return this.sub;
  }
  
}
