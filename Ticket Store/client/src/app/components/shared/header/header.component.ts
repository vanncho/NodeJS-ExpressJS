import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';

import { AuthenticationService } from '../../../core/services/authentication.service';
import { HeaderService } from '../../../core/services/header.service';
import { CategoryService } from '../../../core/services/category.service';

import { UserType } from '../../../core/enumerations/user-type.enum';
import { Category } from '../../../core/models/view/category.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public username: string;
  private loggedUserNameISubscription: ISubscription;
  private categoriesISubscription: ISubscription;
  private categories: Array<Category>;
  private cartItems: number;

  constructor(private authenticationService: AuthenticationService,
              private categoryService: CategoryService,
              private headerService: HeaderService) {
  }

  ngOnInit(): void {

    this.loggedUserNameISubscription = this.headerService.loggedUserName.subscribe((userFullName) => {
      this.username = userFullName;
    });

    this.categoriesISubscription = this.categoryService.getAllCategories().subscribe((categories: any) => {
      this.categories = Object.values(categories.data);
    });

    this.headerService.cartItems.subscribe((cartItems: number) => {

      this.cartItems = cartItems;
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

  private isUser(): boolean {

    return this.authenticationService.getIsUser();
  }

  private getAdminPanel(): void {

    this.headerService.menuSwitch.next(UserType.ADMIN);
  }

  ngOnDestroy(): void {

    if (this.loggedUserNameISubscription) {

      this.loggedUserNameISubscription.unsubscribe();
    }

    if (this.categoriesISubscription) {

      this.categoriesISubscription.unsubscribe();
    }
  }
}

