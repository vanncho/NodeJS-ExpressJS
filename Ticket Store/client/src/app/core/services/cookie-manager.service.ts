import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';

const authtoken = 'authtoken';
const fullName = 'fullName';
const userrole = 'userrole';
const userid = 'userid';
const showAdminPanel = 'sap';

@Injectable()
export class CookieManagerService {

  constructor(private _cookieService: CookieService) { }

  saveLoginData(data): void {

    // this._cookieService.put(authtoken, data.token);
    this._cookieService.put(fullName, data.fullName);
    this._cookieService.put(userrole, data.role);
    this._cookieService.put(userid, data.userId);
    this._cookieService.put(showAdminPanel, 'false');
  }

  removeLoginData(): void {

    // this._cookieService.remove(authtoken);
    this._cookieService.remove(fullName);
    this._cookieService.remove(userrole);
    this._cookieService.remove(userid);
    this._cookieService.remove(showAdminPanel);
  }

  add(key, value): void {

    this._cookieService.put(key, value);
  }

  get(key): string {
    // console.log(this._cookieService.get('user_sid'))
    return this._cookieService.get(key);
  }
}
