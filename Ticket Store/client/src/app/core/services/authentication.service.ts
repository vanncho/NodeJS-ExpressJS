import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';

import { RegisterModel } from '../models/binding/register.model';
import { LoginModel } from '../models/binding/login.model';
import { AuthenticationUtility } from '../utils/authentication.util';
import { HttpClientService } from './http-client.service';
import { CookieManagerService } from '../../core/services/cookie-manager.service';

@Injectable()
export class AuthenticationService implements OnDestroy {

  private subscription: ISubscription;
  private url: string;
  private loginStr: string;
  private logoutStr: string;
  private isLogged: boolean;

  constructor(private authUtil: AuthenticationUtility,
              private cookieService: CookieManagerService,
              private httpClientService: HttpClientService) {
    this.loginStr = '/login';
    this.logoutStr = '/_logout';
    this.isLogged = false;
  }

  login(loginModel: LoginModel): Observable<Object> {

    return this.httpClientService.post('/api/login', JSON.stringify(loginModel), this.authUtil.headersBasic());
 }

  register(registerModel: RegisterModel): Observable<Object> {

    return this.httpClientService.post('/api/register', JSON.stringify(registerModel), this.authUtil.headersBasic());
  }

  logout(): Observable<Object> {

    return this.httpClientService.get('/api/logout', this.authUtil.headersBasic());
  }

  isLoggedIn(): boolean {

    // return this.cookieService.get('authtoken') !== undefined;
    return this.cookieService.get('userid') !== undefined;
  }

  ngOnDestroy(): void {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
