import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HeaderService } from './header.service';

const authtoken = 'authtoken';
const fullName = 'fullName';
const userrole = 'userrole';
const userid = 'userid';
const showAdminPanel = 'sap';

@Injectable()
export class CookieManagerService {

  constructor(private _cookieService: CookieService,
              private headerService: HeaderService) { }

  saveLoginData(data): void {

    // this._cookieService.put(authtoken, data.token);
    this.headerService.loggedUserName.next(data.fullName);
    this._cookieService.set(fullName, data.fullName);
    this._cookieService.set(userrole, data.role);
    this._cookieService.set(userid, data.userId);
    this._cookieService.set(showAdminPanel, 'false');
  }

  removeLoginData(): void {

    // this._cookieService.remove(authtoken);
    this._cookieService.delete(fullName);
    this._cookieService.delete(userrole);
    this._cookieService.delete(userid);
    this._cookieService.delete(showAdminPanel);
  }

  add(key, value): void {

    this._cookieService.set(key, value);
  }

  get(key): string {

    return this._cookieService.get(key);
  }
}
