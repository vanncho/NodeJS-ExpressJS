import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models/view/category.model';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit, OnDestroy {

  public category: Category;
  private subscriptionGetCategory: Subscription;
  private subscriptionEditCategory: Subscription;

  constructor(private categoryService: CategoryService,
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.getCategory();
  }

  private getCategory(): void {

    const categoryId = this.route.params['value'].id;

    this.subscriptionGetCategory = this.categoryService.getCategoryById(categoryId).subscribe((category: Category) => {

      this.category = category;

    }, error => {

      if (error.status === 401) {

        this.authenticationService.logout();
      } else {
        console.log(error);
      }
    });

  }

  editCategory() {

    this.subscriptionEditCategory = this.categoryService.editCategory(this.category).subscribe(() => {

      this.router.navigate(['admin/categories']);

    }, error => {

      if (error.status === 401) {

        this.authenticationService.logout();
      } else {
        console.log(error);
      }
    });
  }

  ngOnDestroy(): void {

    if (this.subscriptionGetCategory) {
      this.subscriptionGetCategory.unsubscribe();
    }

    if (this.subscriptionEditCategory) {
      this.subscriptionEditCategory.unsubscribe();
    }
  }
}
