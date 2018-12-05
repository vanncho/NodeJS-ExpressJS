import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, CanLoad } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CookieManagerService } from '../../../core/services/cookie-manager.service';

@Injectable()
export class AdminGuard implements CanActivate, CanLoad {

  constructor(private cookieService: CookieManagerService,
              private router: Router) {

  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.checkUserIsAdmin(state.url);
  }

  canLoad(route: Route): boolean {
    return this.checkUserIsAdmin(route.path);
  }

  checkUserIsAdmin(url: string): boolean {

    if (this.cookieService.get('userrole') === 'ADMIN') {
      return true;
    }

    this.router.navigate(['/home']);
    return false;
  }
}
