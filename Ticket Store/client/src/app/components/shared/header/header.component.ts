import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { CookieManagerService } from '../../../core/services/cookie-manager.service';
import { AppComponent } from '../../../app.component';

import { UserType } from '../../../core/enumerations/user-type.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public admin: boolean;
  public username: string;

  constructor(private authenticationService: AuthenticationService,
              private cookieService: CookieManagerService,
              private app: AppComponent) {
  }

  ngOnInit(): void {

    this.username = this.cookieService.get('fullName');
    this.isAdmin();
    console.log('HeaderComponent');
    console.log(this.username);
  }

  private showHideNavigation() {

    return this.authenticationService.isLoggedIn();
  }

  private isAdmin(): boolean {

    const role = this.cookieService.get('userrole');

    if (role === 'ADMIN') {
      this.admin = true;
    } else {
      this.admin = false;
    }

    return this.admin;
  }

  private getAdminPannel(): void {

    this.app.setMenuTo(UserType.ADMIN);
  }
}
