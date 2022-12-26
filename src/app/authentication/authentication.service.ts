import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseModel } from 'src/models/response.model';
import { TokenResponseModel } from './../../models/token-response.model';
import { UserInfoModel } from './../../models/user-info.model';

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
}
