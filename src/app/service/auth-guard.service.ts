import { AccountType } from './../../enum/account-type.enum';
import { LocalStorageService } from './local-storage.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { PageLink } from './../../constant/path-link.constant';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { LocalStorageKey } from 'src/constant/local-storage-key.constant';
import { AccessLevel } from 'src/enum/access-level.enum';
import { DetailComponent } from '../restaurant/detail/detail.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const accessLevel = route.data['AccessLevel'] as (Array<AccessLevel> | undefined);

    const userId = this.localStorageService.get<string>(LocalStorageKey.userId);
    const userType = this.localStorageService.get<string>(LocalStorageKey.userType);
    const viewMode = this.localStorageService.get<string>(LocalStorageKey.viewMode);
    const accessToken = this.localStorageService.get<string>(LocalStorageKey.accessToken);

    if (userId && userType && accessToken && viewMode) {
      if (accessLevel && accessLevel.includes(Number(viewMode))) {
        return true;
      }
      else if (!accessLevel) {
        return true;
      } else {
        // that page can not access by current mode --> route to correct page
        this.routeByUserType(Number(viewMode));
        return false;
      }
    } else {
      this.localStorageService.removeAll();
      this.router.navigate([PageLink.authentication.login]);
      return false;
    }
  }

  routeByUserType(userType: AccountType) {
    if (userType === AccountType.Reviewer) {
      this.router.navigate([PageLink.reviewer.homepage]);
    } else {
      this.router.navigate([PageLink.restaurant.dashboard]);
    }
  }
}
