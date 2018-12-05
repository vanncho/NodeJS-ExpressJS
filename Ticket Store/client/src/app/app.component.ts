import { Injectable, Component, OnInit } from '@angular/core';
import { CookieManagerService } from './core/services/cookie-manager.service';

import { UserType } from './core/enumerations/user-type.enum';

const showAdminPanel = 'sap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent implements OnInit {

  private adminMenu: boolean;
  // title = 'app';

  constructor(private cookieService: CookieManagerService) {
  }

  ngOnInit(): void {

    this.setMenuOnReRender();
  }

  setMenuTo(menu): void {

    if (menu === UserType.ADMIN) {
      this.cookieService.add(showAdminPanel, 'true');
      this.adminMenu = true;
    } else {
      this.cookieService.add(showAdminPanel, 'false');
      this.adminMenu = false;
    }

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
