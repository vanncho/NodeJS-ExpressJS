import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';

import { AuthenticationService } from '../../../core/services/authentication.service';
import { CookieManagerService } from '../../../core/services/cookie-manager.service';
import { HeaderService } from '../../../core/services/header.service';

import { UserType } from '../../../core/enumerations/user-type.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  // public admin: boolean;
  public username: string;
  private loggedUserNameISubscription: ISubscription;

  constructor(private authenticationService: AuthenticationService,
              private cookieService: CookieManagerService,
              private headerService: HeaderService) {
  }

  ngOnInit(): void {

    this.loggedUserNameISubscription = this.headerService.loggedUserName.subscribe((userFullName) => {
      this.username = userFullName;
    });

    this.isAdmin();
  }

  private logout(): void {
    this.authenticationService.logout();
  }

  private showHideNavigation(): boolean {

    return this.authenticationService.isLoggedIn();
  }

  private isAdmin(): boolean {

    return this.authenticationService.getIsAdmin();
  }

  private getAdminPanel(): void {

    this.headerService.menuSwitch.next(UserType.ADMIN);
  }

  ngOnDestroy(): void {

    if (this.loggedUserNameISubscription) {

      this.loggedUserNameISubscription.unsubscribe();
    }
  }
}

