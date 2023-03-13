import { ReviewerRegisterModel, RestaurantRegisterModel } from './../../models/register.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseModel } from 'src/models/response.model';
import { TokenResponseModel } from './../../models/token-response.model';
import { UserInfoModel } from './../../models/user-info.model';
import { ResetPasswordModel } from 'src/models/reset-password.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  sub: any;

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const url = `${environment.kinMaiApi}/Authentication/Login`;
    this.sub = this.http.post<ResponseModel<TokenResponseModel>>(url, { email, password });
    return this.sub;
  }

  getUserInfo(email: string) {
    const url = `${environment.kinMaiApi}/Authentication/GetUserInfo?email=${email}`;
    this.sub = this.http.get<ResponseModel<UserInfoModel>>(url);
    return this.sub;
  }

  reviewerRegister(model: ReviewerRegisterModel) {
    const url = `${environment.kinMaiApi}/Authentication/ReviewerRegister`;
    this.sub = this.http.post<ResponseModel<boolean>>(url, model);
    return this.sub;
  }

  restaurantRegister(model: RestaurantRegisterModel) {
    const url = `${environment.kinMaiApi}/Authentication/RestaurantRegister`;

    let formData = new FormData();
    formData.append('PersonalInfo.FirstName', model.personalInfo.firstName);
    formData.append('PersonalInfo.LastName', model.personalInfo.lastName);
    formData.append('PersonalInfo.Email', model.personalInfo.email);
    formData.append('PersonalInfo.Username', model.personalInfo.username);
    formData.append('PersonalInfo.Password', model.personalInfo.password ?? '');
    formData.append('PersonalInfo.ConfirmPassword', model.personalInfo.confirmPassword ?? '');
    formData.append('RestaurantInfo.RestaurantName', model.restaurantInfo.restaurantName);
    formData.append('RestaurantInfo.MinPriceRate', model.restaurantInfo.minPriceRate.toString());
    formData.append('RestaurantInfo.MaxPriceRate', model.restaurantInfo.maxPriceRate.toString());
    formData.append('RestaurantInfo.Address.Address', model.restaurantInfo.address.address);
    formData.append('RestaurantInfo.Address.Latitude', model.restaurantInfo.address.latitude.toString());
    formData.append('RestaurantInfo.Address.Longitude', model.restaurantInfo.address.longitude.toString());
    formData.append('RestaurantInfo.RestaurantType', model.restaurantInfo.restaurantType.toString());
    formData.append('RestaurantAdditionInfo.RestaurantStatus', model.restaurantAdditionInfo.restaurantStatus);
    model.restaurantInfo.deliveryType.forEach((type) => {
      formData.append('RestaurantInfo.DeliveryType', type.toString());
    });
    model.restaurantInfo.categories.forEach((type) => {
      formData.append('RestaurantInfo.Categories', type.toString());
    });
    model.restaurantInfo.paymentMethods.forEach((type) => {
      formData.append('RestaurantInfo.PaymentMethods', type.toString());
    });
    model.restaurantInfo.contact.forEach((type, index) => {
      formData.append(`RestaurantInfo.Contact[${index}].Social`, type.social.toString());
      formData.append(`RestaurantInfo.Contact[${index}].ContactValue`, type.contactValue);
    });
    model.restaurantInfo.businessHours.forEach((dateInfo, index) => {
      formData.append(`RestaurantInfo.BusinessHours[${index}].Day`, dateInfo.day.toString());
      formData.append(`RestaurantInfo.BusinessHours[${index}].StartTime`, dateInfo.startTime.toISOString());
      formData.append(`RestaurantInfo.BusinessHours[${index}].EndTime`, dateInfo.endTime.toISOString());
    });
    model.restaurantAdditionInfo.imageFiles.forEach((file) => {
      formData.append('RestaurantAdditionInfo.ImageFiles', file);
    })

    this.sub = this.http.post<ResponseModel<boolean>>(url, formData);
    return this.sub;
  }

  checkIsLoginWithGoogleFirstTimes(email: string) {
    const url = `${environment.kinMaiApi}/Authentication/CheckIsLoginWithGoogleFirstTimes?email=${email}`;
    this.sub = this.http.get<ResponseModel<boolean>>(url);
    return this.sub;
  }

  sendEmailForgotPassword(email: string) {
    const url = `${environment.kinMaiApi}/Authentication/SendEmailResetPassword`;
    this.sub = this.http.post<ResponseModel<boolean>>(url, { email });
    return this.sub;
  }

  resetPassword(request: ResetPasswordModel) {
    const url = `${environment.kinMaiApi}/Authentication/ResetPassword`;
    this.sub = this.http.post<ResponseModel<boolean>>(url, request);
    return this.sub;
  }
}
