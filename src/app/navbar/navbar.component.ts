import { AccessLevel } from 'src/enum/access-level.enum';
import { AuthenticationService } from './../authentication/authentication.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LocalStorageKey } from 'src/constant/local-storage-key.constant';
import { AccountType } from 'src/enum/account-type.enum';
import { LocalStorageService } from '../service/local-storage.service';
import { PageLink } from 'src/constant/path-link.constant';
import { take } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  sub: any;

  username: string = '';
  isLogin: boolean = true;
  accountType: number = AccountType.Reviewer;
  viewMode: number;
  restaurantName: string = '';
  isReviewerAccount: boolean = true;
  isMenuCollapsed: boolean = true;

  AccountTypeEnum = AccountType;
  AccessLevelEnum = AccessLevel;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    const username =  this.localStorageService.get<string>(LocalStorageKey.userName);
    const restaurantName = this.localStorageService.get<string>(LocalStorageKey.restaurantName);
    const userType = this.localStorageService.get<string>(LocalStorageKey.userType);
    const viewMode = this.localStorageService.get<string>(LocalStorageKey.viewMode);
    this.username = username ?? 'Username';
    this.restaurantName = restaurantName ?? 'RestaurantName';
    this.viewMode = Number(viewMode) ?? AccessLevel.Public;
    this.accountType = Number(userType) ?? 0;
    this.isReviewerAccount = (Number(viewMode) ?? 0) === AccessLevel.Reviewer;

    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.sub = this.localStorageService.getUserIsLogin().pipe(take(1)).subscribe((status) => {
      this.isLogin = status;
    })
  }

  changeAccountMode(nextMode: AccountType) {
    if (this.accountType === AccountType.RestaurantOwner
      && nextMode === AccountType.RestaurantOwner
    ) {
      // to mode restaurant
      this.viewMode = AccessLevel.RestaurantOwner;
      this.localStorageService.set(LocalStorageKey.viewMode, AccessLevel.RestaurantOwner);
      this.router.navigate([PageLink.restaurant.dashboard]);
      this.isReviewerAccount = false;
    } else {
      // to mode reviewer
      this.viewMode = AccessLevel.Reviewer;
      this.localStorageService.set(LocalStorageKey.viewMode, AccessLevel.Reviewer);
      this.router.navigate([PageLink.reviewer.homepage]);
      this.isReviewerAccount = true;
    }
  }

  routeByAccountMode() {
    if (this.viewMode === AccessLevel.Reviewer) {
      this.router.navigate([PageLink.reviewer.homepage]);
    } else if (this.viewMode === AccessLevel.Public) {
      this.router.navigate([PageLink.reviewer.homepage]);
    } else {
      this.router.navigate([PageLink.restaurant.dashboard]);
    }
  }

  routeToFavoriteRestaurant() {
    this.router.navigate([PageLink.reviewer.favoriteRestaurant]);
  }

  login() {
    this.isMenuCollapsed = true
    this.router.navigate([PageLink.authentication.login], {
      queryParams: { 'redirectURL': this.router.url }
    });
  }

  logout() {
    this.localStorageService.removeAll();
    setTimeout(() => {
      this.router.navigate([PageLink.authentication.login]);
    }, 200);
  }
}
