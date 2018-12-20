import { Injectable } from '@angular/core';
import { HeaderService } from './header.service';

const fullName = 'fullName';
const userrole = 'userrole';
const userid = 'userid';
const showAdminPanel = 'sap';

@Injectable()
export class CookieManagerService {

  constructor(private headerService: HeaderService) { }

  saveLoginData(data: any): void {

    this.headerService.loggedUserName.next(data.fullName);

    localStorage.setItem(fullName, data.fullName);
    localStorage.setItem(userrole, data.role);
    localStorage.setItem(userid, data.userId);
    localStorage.setItem(showAdminPanel, 'false');
  }

  removeLoginData(): void {

    localStorage.clear();
  }

  add(key: string, value: string): void {

    localStorage.setItem(key, value);
  }

  get(key: string): string {

    return localStorage.getItem(key);
  }
}
