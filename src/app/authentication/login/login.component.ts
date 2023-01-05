import { AccountType } from './../../../enum/account-type.enum';
import { GoogleAuthService } from './../../service/google-auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageKey } from 'src/constant/local-storage-key.constant';
import { LocalStorageService } from './../../service/local-storage.service';
import { PageLink } from './../../../constant/path-link.constant';
import { AuthenticationService } from './../authentication.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isShowPassword: boolean = false;

  constructor(
      private fb: FormBuilder
    , private router: Router
    , private localStorageService: LocalStorageService
    , private authenticationService: AuthenticationService
    , private authService: SocialAuthService
    , private googleAuthService: GoogleAuthService
    ) {
    this.loginForm = this.fb.group({
      username: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.minLength(8),
        Validators.required
      ])
    });

    this.authService.authState.subscribe((user) => {
      this.googleAuthService.login(user);
    });
  }

  ngOnInit(): void {

  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  routePage(mode: AccountType) {
    switch(mode) {
      case AccountType.Reviewer:
        this.router.navigate([PageLink.reviewer.homepage]);
        break;
      case AccountType.RestaurantOwner:
        this.router.navigate([PageLink.restaurant.dashboard]);
        break;
    }
  }

  submit() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      const email = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      this.authenticationService.login(email, password).subscribe((response: any) => {
        if (response?.status === 200) {
          if (response.data) {
            let token = response.data;
            this.localStorageService.set(LocalStorageKey.expirationToken, String(token.expiredToken));
            this.localStorageService.set(LocalStorageKey.refreshToken, token.refreshToken);
            this.localStorageService.set(LocalStorageKey.accessToken, token.token);

            this.authenticationService.getUserInfo(email).subscribe((resp: any) => {
              if (resp.status === 200) {
                this.localStorageService.set(LocalStorageKey.userId, resp.data.userId);
                this.localStorageService.set(LocalStorageKey.userName, resp.data.userName);
                this.localStorageService.set(LocalStorageKey.restaurantName, resp.data.restaurantName);
                this.localStorageService.set(LocalStorageKey.userType, resp.data.userType);
                this.localStorageService.set(LocalStorageKey.viewMode,
                  resp.data.userType === AccountType.Reviewer
                  ? AccountType.Reviewer
                  : AccountType.RestaurantOwner
                );

                this.authenticationService.loginSuccessEvent(true);
                this.routePage(resp.data.userType);
              }
            })
          }
        }
      });
    }
  }
}
