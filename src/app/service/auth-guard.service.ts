import { AccountType } from './../../enum/account-type.enum';
import { LocalStorageService } from './local-storage.service';
import { SocialUser } from '@abacritt/angularx-social-login';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { PageLink } from './../../constant/path-link.constant';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { Injectable } from '@angular/core';
import { LocalStorageKey } from 'src/constant/local-storage-key.constant';
import { AccessLevel } from 'src/enum/access-level.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private socialAuthService: SocialAuthService,
    private localStorageService: LocalStorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const accessLevel = route.data['AccessLevel'] as (Array<AccessLevel> | undefined);

    const userId = this.localStorageService.get<string>(LocalStorageKey.userId);
    const userType = this.localStorageService.get<string>(LocalStorageKey.userType);
    const accessToken = this.localStorageService.get<string>(LocalStorageKey.accessToken);

    if (userId && userType && accessToken) {
      if (accessLevel && accessLevel.includes(Number(userType))) {
        return true;
      }
      else if (!accessLevel) {
        return true;
      } else {
        this.routeByUserType(Number(userType));
        return false;
      }
    } else {
      this.router.navigate([PageLink.authentication.login]);
      return false;
    }
  }

  routeByUserType(userType: AccountType) {
    if (userType === AccountType.Reviewer) {
      this.router.navigate([PageLink.reviewer.homepage]);
    } else {
      this.router.navigate([PageLink.reviewer.homepage]);
    }
  }
}
