import { AuthenticationService } from './../authentication/authentication.service';
import { NavigationEnd, Router } from '@angular/router';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageKey } from 'src/constant/local-storage-key.constant';
import { AccountType } from 'src/enum/account-type.enum';
import { LocalStorageService } from '../service/local-storage.service';
import { PageLink } from 'src/constant/path-link.constant';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private sub: any;

  username: string = '';
  isLogin: boolean = true;
  accountType: number = AccountType.Reviewer;
  restaurantName: string = '';
  isReviewerAccount: boolean = true;
  isMenuCollapsed: boolean = true;

  AccountTypeEnum = AccountType;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    const username =  this.localStorageService.get<string>(LocalStorageKey.userName);
    const restaurantName = this.localStorageService.get<string>(LocalStorageKey.restaurantName);
    const userType = this.localStorageService.get<string>(LocalStorageKey.userType);
    const viewMode = this.localStorageService.get<string>(LocalStorageKey.viewMode);
    this.username = username ?? 'Username';
    this.restaurantName = restaurantName ?? 'RestaurantName';
    this.accountType = Number(userType);
    this.isReviewerAccount = (Number(viewMode) ?? 0) === AccountType.Reviewer;

    this.sub = this.authenticationService.handleLoginSuccessEvent
      .subscribe((isSuccess) => {
        console.log(isSuccess)
        if (isSuccess) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  changeAccountMode(nextMode: AccountType) {
    if (this.accountType === AccountType.RestaurantOwner
      && nextMode === AccountType.RestaurantOwner
    ) {
      // to mode restaurant
      this.isReviewerAccount = false;
    } else {
      // to mode reviewer
      this.isReviewerAccount = true;
    }
  }

  logout() {
    this.localStorageService.removeAll();
    this.authenticationService.loginSuccessEvent(false);
    this.router.navigate([PageLink.authentication.login]);
  }
}
