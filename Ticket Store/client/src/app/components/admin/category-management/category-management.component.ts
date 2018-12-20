import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
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

  private subscriptionAllCategories: ISubscription;
  private subscriptionDeleteCategory: ISubscription;
  private subscriptionSearchCategory: ISubscription;
  private categories: Array<Category>;
  private searchedCategory: string;

  constructor(private categoryService: CategoryService,
              private authenticationService: AuthenticationService,
              private toastr: ToastrService) {
    this.searchedCategory = '';
  }

  ngOnInit() {
    this.loadAllCategories();
  }

  private loadAllCategories(): void {

    this.subscriptionAllCategories = this.categoryService.getAllCategories().subscribe((categories: any) => {

      this.categories = Object.values(categories.data);

    }, error => {

        if (error.status === 401) {

          this.authenticationService.logout();
        }
    });
  }

  private deleteCategory(categoryId) {

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
      }
  });
  }

  private getCategoryByName(): void {

    this.subscriptionSearchCategory = this.categoryService.searchCategoryWithNameLike(this.searchedCategory)
                                                          .subscribe((categories: any) => {

      this.categories = Object.values(categories.data);
    }, error => {

      if (error.status === 401) {

        this.authenticationService.logout();
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
