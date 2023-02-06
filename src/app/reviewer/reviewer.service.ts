import { RestaurantInfoListModel } from './../../models/restaurant-info.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseModel } from 'src/models/response.model';
import { HttpClient } from '@angular/common/http';
import { GetRestaurantNearMeRequestModel, SetFavoriteRestaurantRequestModel } from './../../models/reviewer-homepage.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewerService {
  sub: any;

  constructor(private http: HttpClient) { }

  getRestaurantNearMeList(model: GetRestaurantNearMeRequestModel) {
    const url = `${environment.kinMaiApi}/Reviewer/GetRestaurantNearMeList?userId=${model.userId}&latitude=${model.latitude}\n
                &longitude=${model.longitude}&skip=${model.skip}&take=${model.take}`;
    this.sub = this.http.get<ResponseModel<RestaurantInfoListModel>>(url);
    return this.sub;
  }

  setFavoriteRestaurant(model: SetFavoriteRestaurantRequestModel) {
    const url = `${environment.kinMaiApi}/Reviewer/SetFavoriteRestaurant`;
    this.sub = this.http.post<ResponseModel<boolean>>(url, model);
    return this.sub;
  }
}
