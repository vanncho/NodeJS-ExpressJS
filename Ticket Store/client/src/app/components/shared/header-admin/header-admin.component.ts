import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { CookieManagerService } from '../../../core/services/cookie-manager.service';
import { AppComponent } from '../../../app.component';

import { UserType } from '../../../core/enumerations/user-type.enum';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {

  public admin: boolean;
  public username: string;

  constructor(private authenticationService: AuthenticationService,
              private cookieService: CookieManagerService,
              private app: AppComponent) { }

  ngOnInit() {
    this.username = this.cookieService.get('fullName');
  }

  showHideNavigation() {

    return this.authenticationService.isLoggedIn();
  }

  isAdmin(): boolean {

    const role = this.cookieService.get('userrole');

    if (role === 'ADMIN') {
      this.admin = true;
    } else {
      this.admin = false;
    }

    return this.admin;
  }

  showUserMenu() {

    this.app.setMenuTo(UserType.USER);
  }
}
