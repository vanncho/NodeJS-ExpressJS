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

  saveLoginData(data: any): void {

    // this._cookieService.put(authtoken, data.token);
    this.headerService.loggedUserName.next(data.fullName);
    this._cookieService.set('fullName', data.fullName);
    this._cookieService.set('userrole', data.role);
    this._cookieService.set('userid', data.userId);
    this._cookieService.set('showAdminPanel', 'false');
  }

  removeLoginData(): void {

    this._cookieService.delete('fullName');
    this._cookieService.delete('userrole');
    this._cookieService.delete('sap');
    this._cookieService.delete('userid');
    this._cookieService.delete('showAdminPanel');
    console.log('REM')
  }

  add(key: string, value: string): void {

    this._cookieService.set(key, value);
  }

  get(key: string): string {

    return this._cookieService.get(key);
  }
}
