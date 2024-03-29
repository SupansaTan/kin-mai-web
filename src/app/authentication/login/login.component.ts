import { AccessLevel } from 'src/enum/access-level.enum';
import { AccountType } from './../../../enum/account-type.enum';
import { GoogleAuthService } from './../../service/google-auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LocalStorageKey } from 'src/constant/local-storage-key.constant';
import { LocalStorageService } from './../../service/local-storage.service';
import { PageLink } from './../../../constant/path-link.constant';
import { AuthenticationService } from './../authentication.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalSuccessComponent } from 'src/app/shared/modal-success/modal-success.component';
import { ResponseModel } from 'src/models/response.model';
import { TokenResponseModel } from 'src/models/token-response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('successModalComponent') successModal: ModalSuccessComponent;
  loginForm: FormGroup;
  redirectURL: string;
  isShowPassword: boolean = false;

  constructor(
      private fb: FormBuilder
    , private router: Router
    , private route: ActivatedRoute
    , private localStorageService: LocalStorageService
    , private authenticationService: AuthenticationService
    , private authService: SocialAuthService
    , private googleAuthService: GoogleAuthService
    , private spinner: NgxSpinnerService
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
    let params = this.route.snapshot.queryParams;
    if (params['redirectURL']) {
      this.redirectURL = params['redirectURL'];
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  routePage(mode: AccountType) {
    if (this.redirectURL) {
      this.router.navigateByUrl(this.redirectURL);
    } else {
      switch(mode) {
        case AccountType.Reviewer:
          this.router.navigate([PageLink.reviewer.homepage]);
          break;
        case AccountType.RestaurantOwner:
          this.router.navigate([PageLink.restaurant.dashboard]);
          break;
      }
    }
  }

  submit() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      const email = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      this.spinner.show();

      this.authenticationService.login(email, password).subscribe((response: ResponseModel<TokenResponseModel>) => {
        if (response?.status === 200) {
          if (response.data) {
            let token = response.data;
            this.localStorageService.set(LocalStorageKey.expirationToken, String(token.expiredToken));
            this.localStorageService.set(LocalStorageKey.refreshToken, token.refreshToken);
            this.localStorageService.set(LocalStorageKey.accessToken, token.token);

            this.authenticationService.getUserInfo(email).subscribe((resp: any) => {
              this.spinner.hide();

              if (resp.status === 200) {
                this.localStorageService.set(LocalStorageKey.userId, resp.data.userId);
                this.localStorageService.set(LocalStorageKey.userName, resp.data.userName);
                this.localStorageService.set(LocalStorageKey.restaurantName, resp.data.restaurantName);
                this.localStorageService.set(LocalStorageKey.restaurantId, resp.data.restaurantId);
                this.localStorageService.set(LocalStorageKey.userType, resp.data.userType);
                this.localStorageService.set(LocalStorageKey.viewMode,
                  resp.data.userType === AccountType.Reviewer
                  ? AccessLevel.Reviewer
                  : AccessLevel.RestaurantOwner
                );
                this.routePage(resp.data.userType);
              }
            },
            (error: any) => {
              this.spinner.hide();
              this.successModal.openSuccessModal(false, 'ไม่สามารถเข้าใช้งานได้ในขณะนี้ โปรดลองอีกครั้ง');
            })
          }
        } else {
          this.spinner.hide();
          this.successModal.openSuccessModal(false, response.message);
        }
      },
      (error: any) => {
        this.spinner.hide();
        this.successModal.openSuccessModal(false, 'ไม่สามารถเข้าใช้งานได้ในขณะนี้ โปรดลองอีกครั้ง');
      });
    }
  }
}
