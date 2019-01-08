import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { CategoryService } from '../../../core/services/category.service';

import { Category } from '../../../core/models/view/category.model';


@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit, OnDestroy {

  public categories: Category[];
  public searchedCategory: string;
  private subscriptionAllCategories: Subscription;
  private subscriptionDeleteCategory: Subscription;
  private subscriptionSearchCategory: Subscription;

  constructor(private categoryService: CategoryService,
              private authenticationService: AuthenticationService,
              private toastr: ToastrService) {
    this.searchedCategory = '';
  }

  ngOnInit() {
    this.loadAllCategories();
  }

  loadAllCategories(): void {

    this.subscriptionAllCategories = this.categoryService.getAllCategories().subscribe((categories: Category[]) => {

      this.categories = categories;

    }, error => {

        if (error.status === 401) {

          this.authenticationService.logout();
        } else {
          console.log(error);
        }
    });
  }

  deleteCategory(categoryId) {

    this.subscriptionDeleteCategory = this.categoryService.deleteCategory(categoryId).subscribe(() => {

      let index = 0;
      let count = 0;
      let categoryName = '';

      for (const category of this.categories) {

        if (category.id === Number(categoryId)) {

          index = count;
          categoryName = category['name'];
          break;
        }

        count++;
      }

      this.categories.splice(index, 1);
      this.toastr.success('Deleted successfully.', categoryName);

    }, error => {

      if (error.status === 401) {

        this.authenticationService.logout();
      } else {
        console.log(error);
      }
  });
  }

  getCategoryByName(): void {

    this.subscriptionSearchCategory = this.categoryService.searchCategoryWithNameLike(this.searchedCategory).subscribe((categories: Category[]) => {

      this.categories = categories;
    }, error => {

      if (error.status === 401) {

        this.authenticationService.logout();
      } else {
        console.log(error);
      }
    });
  }

  ngOnDestroy(): void {

    if (this.subscriptionAllCategories) {
      this.subscriptionAllCategories.unsubscribe();
    }

    if (this.subscriptionDeleteCategory) {
      this.subscriptionDeleteCategory.unsubscribe();
    }

    if (this.subscriptionSearchCategory) {
      this.subscriptionSearchCategory.unsubscribe();
    }
  }

}
