import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { CookieManagerService } from '../../core/services/cookie-manager.service';

@Injectable()
export class AuthenticationUtility {

  private admin: boolean;

  constructor(private cookieService: CookieManagerService) {
  }

  headersBasic(): object {

    return {
      headers: this.getAuthHeaders('Basic')
    };
  }

  isAdmin(): boolean {

    const role = this.cookieService.get('userrole');

    if (role === 'admin') {
      this.admin = true;
    } else {
      this.admin = false;
    }

    return this.admin;
  }

  getAuthHeaders(type: string): HttpHeaders {

    const headersObject = {};

    headersObject['Content-Type'] = 'application/json';
    const token = this.cookieService.get('authtoken');

    if (token) {
      headersObject['Authorization'] = 'Bearer ' + token;
    }

    return new HttpHeaders(headersObject);

  }
}
