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
    let formData = new FormData();
    formData.append('RestaurantId', model.RestaurantId);
    formData.append('ResUpdateInfo.RestaurantName', model.ResUpdateInfo.restaurantName);
    formData.append('ResUpdateInfo.MinPriceRate', model.ResUpdateInfo.minPriceRate.toString());
    formData.append('ResUpdateInfo.MaxPriceRate', model.ResUpdateInfo.maxPriceRate.toString());
    formData.append('ResUpdateInfo.Address.Address', model.ResUpdateInfo.address.address);
    formData.append('ResUpdateInfo.Address.Latitude', model.ResUpdateInfo.address.latitude.toString());
    formData.append('ResUpdateInfo.Address.Longitude', model.ResUpdateInfo.address.longitude.toString());
    formData.append('ResUpdateInfo.RestaurantType', model.ResUpdateInfo.restaurantType.toString());
    formData.append('RestaurantStatus', model.RestaurantStatus);
    model.ResUpdateInfo.deliveryType.forEach((type) => {
      formData.append('ResUpdateInfo.DeliveryType', type.toString());
    });
    model.ResUpdateInfo.categories.forEach((type) => {
      formData.append('ResUpdateInfo.Categories', type.toString());
    });
    model.ResUpdateInfo.paymentMethods.forEach((type) => {
      formData.append('ResUpdateInfo.PaymentMethods', type.toString());
    });
    model.ResUpdateInfo.contact.forEach((type, index) => {
      formData.append(`ResUpdateInfo.Contact[${index}].Social`, type.social.toString());
      formData.append(`ResUpdateInfo.Contact[${index}].ContactValue`, type.contactValue);
    });
    model.ResUpdateInfo.businessHours.forEach((dateInfo, index) => {
      formData.append(`ResUpdateInfo.BusinessHours[${index}].Day`, dateInfo.day.toString());
      formData.append(`ResUpdateInfo.BusinessHours[${index}].StartTime`, dateInfo.startTime.toISOString());
      formData.append(`ResUpdateInfo.BusinessHours[${index}].EndTime`, dateInfo.endTime.toISOString());
    });
    model.NewImageFile.forEach((file) => {
      formData.append('NewImageFile', file);
    })
    model.RemoveImageLink.forEach((file) => {
      formData.append('RemoveImageLink', file);
    })
    this.sub = this.http.put<ResponseModel<boolean>>(url, formData);
    return this.sub;
  }

}
