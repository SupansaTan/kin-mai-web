import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageKey } from 'src/constant/local-storage-key.constant';
import { LocalStorageService } from './../../service/local-storage.service';
import { PageLink } from './../../../constant/path-link.constant';
import { AuthenticationService } from './../authentication.service';

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
  }

  ngOnInit(): void {

  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
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
              if (response?.status === 200) {
                this.localStorageService.set(LocalStorageKey.userId, resp.data.userId);
                this.localStorageService.set(LocalStorageKey.userName, resp.data.userName);
                this.localStorageService.set(LocalStorageKey.restaurantName, resp.data.restaurantName);
                this.localStorageService.set(LocalStorageKey.userType, resp.data.userType);
                this.authenticationService.loginSuccessEvent(true);
                this.router.navigate([PageLink.reviewer.homepage]);
              }
            })
          }
        }
      });
    }
  }
}
