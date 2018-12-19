import { Component, OnInit } from '@angular/core';
import { CookieManagerService } from './core/services/cookie-manager.service';
import { HeaderService } from './core/services/header.service';

import { UserType } from './core/enumerations/user-type.enum';

const showAdminPanel = 'sap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private adminMenu: boolean;
  // title = 'app';

  constructor(private cookieService: CookieManagerService,
              private headerService: HeaderService) {
  }

  ngOnInit(): void {

    this.setMenuOnReRender();
    this.headerService.menuSwitch.subscribe((userType: UserType) => {

      if (userType === UserType.ADMIN) {
        this.cookieService.add('showAdminPanel', 'true');
        this.adminMenu = true;
      } else {
        this.cookieService.add('showAdminPanel', 'false');
        this.adminMenu = false;
      }

    });
  }

  private showHideAdminMenu(): boolean {
    return this.adminMenu;
  }

  private setMenuOnReRender(): void {

    const status = this.cookieService.get(showAdminPanel);

    if (status === 'true') {
      this.adminMenu = true;
    } else {
      this.adminMenu = false;
    }
  }
}
