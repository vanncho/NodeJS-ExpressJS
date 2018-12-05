import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, CanLoad } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.checkLoggedIn(state.url);
  }

  canLoad(route: Route): boolean {
    return this.checkLoggedIn(route.path);
  }

  checkLoggedIn(url: string): boolean {

    const isLogged = this.authenticationService.isLoggedIn();

    if (!isLogged) {

      this.router.navigate(['/login']);
      return false;

    }

    return true;
  }
}
