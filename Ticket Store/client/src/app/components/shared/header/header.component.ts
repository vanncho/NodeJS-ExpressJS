import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

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
  public categories: Category[];
  public cartItems: number;
  private loggedUserNameISubscription: Subscription;
  private categoriesISubscription: Subscription;
  private cartItemsISubscription: Subscription;

  constructor(private authenticationService: AuthenticationService,
              private categoryService: CategoryService,
              private headerService: HeaderService) {
  }

  ngOnInit(): void {

    this.loggedUserNameISubscription = this.headerService.loggedUserName.subscribe((userFullName) => {
      this.username = userFullName;
    });

    this.categoriesISubscription = this.categoryService.getAllCategories().subscribe((categories: Category[]) => {

      this.categories = categories;
    });

    this.cartItemsISubscription = this.headerService.cartItems.subscribe((cartItems: number) => {

      this.cartItems = cartItems;
    });

    this.isAdmin();
  }

  logout(): void {
    this.authenticationService.logout();
  }

  showHideNavigation(): boolean {

    return this.authenticationService.isLoggedIn();
  }

  isAdmin(): boolean {

    return this.authenticationService.getIsAdmin();
  }

  isUser(): boolean {

    return this.authenticationService.getIsUser();
  }

  getAdminPanel(): void {

    this.headerService.menuSwitch.next(UserType.ADMIN);
  }

  ngOnDestroy(): void {

    if (this.loggedUserNameISubscription) {

      this.loggedUserNameISubscription.unsubscribe();
    }

    if (this.categoriesISubscription) {

      this.categoriesISubscription.unsubscribe();
    }

    if (this.cartItemsISubscription) {
      this.cartItemsISubscription.unsubscribe();
    }
  }
}

