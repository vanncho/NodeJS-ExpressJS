import { Injectable, OnDestroy, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ISubscription } from 'rxjs/Subscription';
import { ToastrService } from 'ngx-toastr';

import { RegisterModel } from '../models/binding/register.model';
import { LoginModel } from '../models/binding/login.model';
import { AuthenticationUtility } from '../utils/authentication.util';
import { HttpClientService } from './http-client.service';
import { CookieManagerService } from '../../core/services/cookie-manager.service';
import { HeaderService } from './header.service';
import { UserType } from '../enumerations/user-type.enum';

@Injectable()
export class AuthenticationService implements OnDestroy {

  private subscription: ISubscription;
  private loginSubscription: ISubscription;
  private url: string;
  private loginStr: string;
  private logoutStr: string;
  private isLogged: boolean;

  constructor(private authUtil: AuthenticationUtility,
              private cookieService: CookieManagerService,
              private httpClientService: HttpClientService,
              private headerService: HeaderService,
              private toastr: ToastrService,
              // vcr: ViewContainerRef,
              private router: Router) {
    this.loginStr = '/login';
    this.logoutStr = '/_logout';
    this.isLogged = false;
    // this.toastr.setRootViewContainerRef(vcr);
  }

//   login(loginModel: LoginModel): Observable<Object> {

//     return this.httpClientService.post('/api/login', JSON.stringify(loginModel), this.authUtil.headersBasic());
//  }
  login(loginModel: LoginModel): void {

    this.loginSubscription = this.httpClientService.post('/api/login', JSON.stringify(loginModel), this.authUtil.headersBasic())
                          .subscribe((data: any) => {

      if (data.errors.length === 0) {

        this.cookieService.saveLoginData(data.data);
        // this.loginFail = false;

        // this.router.navigate(['/user/home']);
        this.router.navigate(['/user/home']).then((e) => {
          console.log(e)
          this.toastr.success('You have login successfully.');
        });
      } else {

        for (const e of data.errors) {
          this.toastr.error(e);
        }
      }

    });
  }

  register(registerModel: RegisterModel): Observable<Object> {

    return this.httpClientService.post('/api/register', JSON.stringify(registerModel), this.authUtil.headersBasic());
  }

  // logout(): Observable<Object> {

  //   return this.httpClientService.get('/api/logout', this.authUtil.headersBasic());
  // }
  logout(): void {

    this.httpClientService.get('/api/logout', this.authUtil.headersBasic()).subscribe(() => {

      this.headerService.menuSwitch.next(UserType.USER);
      this.cookieService.removeLoginData();
      this.router.navigate(['/login']).then(() => {
        this.toastr.success('You have logout successfully.');
      });
    });
  }

  isLoggedIn(): boolean {

    // return this.cookieService.get('authtoken') !== undefined;
    return this.cookieService.get('userid') !== undefined;
  }

  ngOnDestroy(): void {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    console.log('ngOnDestroy - 1')
    if (this.loginSubscription) {
      console.log('ngOnDestroy - 2')
      this.loginSubscription.unsubscribe();
    }
  }
}
