import { UserInfoModel } from './../../models/user-info.model';
import { ResponseModel } from './../../models/response.model';
import { AuthenticationService } from './../authentication/authentication.service';
import { PageLink } from './../../constant/path-link.constant';
import { Injectable } from '@angular/core';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { LocalStorageKey } from 'src/constant/local-storage-key.constant';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private accessToken = '';
  user: SocialUser;
  loggedIn: boolean;

  constructor(
    private authService: SocialAuthService,
    private authenticationService: AuthenticationService,
    private localStorageService: LocalStorageService,
    private router: Router
    ) {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.login();
    });
  }

  login(): void {
    const email = this.user.email;
    this.authenticationService
      .checkIsLoginWithGoogleFirstTimes(email)
      .subscribe((response: ResponseModel<boolean>) => {
        if (response.status === 200) {
          if (response.data) {
            // login first time --> go to register
            this.router.navigate([PageLink.authentication.register, {
              firstName: this.user.firstName,
              lastName: this.user.lastName,
              email: this.user.email
            }]);
          } else {
            // already have account --> get user info
            this.authenticationService
              .getUserInfo(email)
              .subscribe((resp: ResponseModel<UserInfoModel>) => {
                if (resp.status === 200) {
                  this.localStorageService.set(LocalStorageKey.userId, resp.data.userId);
                  this.localStorageService.set(LocalStorageKey.userName, resp.data.userName);
                  this.localStorageService.set(LocalStorageKey.restaurantName, resp.data.restaurantName);
                  this.localStorageService.set(LocalStorageKey.userType, resp.data.userType);
                  this.authenticationService.loginSuccessEvent(true);
                  this.router.navigate([PageLink.reviewer.homepage]);
                }
              }
            );
          }
        }
      }
    );
  }

  refreshToken(): void {
    this.authService.refreshAccessToken(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.authService.signOut();
  }

  getAccessToken(): void {
    this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.accessToken = accessToken);
  }
}
