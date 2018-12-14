import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClientService } from './http-client.service';
import { ToastrService } from 'ngx-toastr';
import { CookieManagerService } from '../../core/services/cookie-manager.service';
import { HeaderService } from './header.service';

import { RegisterModel } from '../models/binding/register.model';
import { LoginModel } from '../models/binding/login.model';
import { UserType } from '../enumerations/user-type.enum';

import { AuthenticationUtility } from '../utils/authentication.util';


@Injectable()
export class AuthenticationService {

  constructor(private authUtil: AuthenticationUtility,
              private cookieService: CookieManagerService,
              private httpClientService: HttpClientService,
              private headerService: HeaderService,
              private toastr: ToastrService,
              private router: Router) { }

  register(registerModel: RegisterModel): void {

    this.httpClientService.post('/api/register', JSON.stringify(registerModel), this.authUtil.headersBasic()).subscribe((data: any) => {

      if (data.errors.length === 0) {

        this.router.navigate(['/login']).then(() => {
          this.toastr.success('Registration successfully.');
        });

      } else {

        for (const e of data.errors) {
          this.toastr.error(e);
        }
      }
    });
  }

  login(loginModel: LoginModel): void {

    this.httpClientService.post('/api/login', JSON.stringify(loginModel), this.authUtil.headersBasic())
                          .subscribe((data: any) => {

      if (data.errors.length === 0) {

        this.cookieService.saveLoginData(data.data);

        this.router.navigate(['/user/home']).then(() => {
          this.toastr.success('You have login successfully.');
        });

      } else {

        for (const e of data.errors) {
          this.toastr.error(e);
        }
      }

    });
  }

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
    return this.cookieService.get('userid') !== '';
  }

  getIsAdmin(): boolean {

    const role = this.cookieService.get('userrole');

    return role === 'ADMIN' ? true : false;
  }

}
