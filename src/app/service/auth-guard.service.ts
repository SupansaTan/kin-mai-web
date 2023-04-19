import { LocalStorageService } from './local-storage.service';
import { PageLink } from './../../constant/path-link.constant';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { LocalStorageKey } from 'src/constant/local-storage-key.constant';
import { AccessLevel } from 'src/enum/access-level.enum';

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

    if (userId && userType && accessToken) {
      if (accessLevel && accessLevel.includes(Number(viewMode))) {
        return true;
      }
      else {
        // that page can not access by current mode --> route to correct page
        this.routeByMode(Number(viewMode), state.url);
        return false;
      }
    } else if (accessLevel?.includes(AccessLevel.Public)) {
      return true;
    } else {
      this.localStorageService.removeAll();
      this.router.navigate([PageLink.authentication.login],{
        queryParams: { 'redirectURL': state.url }
      });
      return false;
    }
  }

  routeByMode(mode: AccessLevel, url: string) {
    if (url && url.includes('reviewer') && this.router.url.includes('redirectURL')) {
      this.localStorageService.set(LocalStorageKey.viewMode, AccessLevel.Reviewer);
      this.router.navigateByUrl(url);
    } else {
      if (mode === AccessLevel.Reviewer) {
        this.router.navigate([PageLink.reviewer.homepage]);
      } else if (mode === AccessLevel.RestaurantOwner) {
        this.router.navigate([PageLink.restaurant.dashboard]);
      } else {
        this.router.navigate([PageLink.reviewer.homepage]);
      }
    }
  }
}
