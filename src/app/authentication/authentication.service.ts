import { ReviewerRegisterModel, RestaurantRegisterModel } from './../../models/register.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseModel } from 'src/models/response.model';
import { TokenResponseModel } from './../../models/token-response.model';
import { UserInfoModel } from './../../models/user-info.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private subject = new Subject();
  sub: any;

  constructor(private http: HttpClient) { }

  get handleLoginSuccessEvent() {
    return this.subject.asObservable();
  }

  loginSuccessEvent(isSuccess: boolean) {
    this.subject.next(isSuccess);
  }

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
    this.sub = this.http.post<ResponseModel<boolean>>(url, model);
    return this.sub;
  }

  checkIsLoginWithGoogleFirstTimes(email: string) {
    const url = `${environment.kinMaiApi}/Authentication/CheckIsLoginWithGoogleFirstTimes?email=${email}`;
    this.sub = this.http.get<ResponseModel<boolean>>(url);
    return this.sub;
  }
}
