import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models/view/category.model';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit, OnDestroy {

  private subscriptionGetCategory: ISubscription;
  private subscriptionEditCategory: ISubscription;
  private category: Category;

  constructor(private categoryService: CategoryService,
              private route: ActivatedRoute,
              private router: Router) {
    this.category = new Category(0, '');
  }

  ngOnInit() {
    this.getCategory();
  }

  private getCategory(): void {

    const categoryId = this.route.params['value'].id;

    this.subscriptionGetCategory = this.categoryService.getCategoryById(categoryId).subscribe((data) => {

      this.category = new Category(Number(data['id']), data['name']);

    }, (error) => {

    });

  }

  private editCategory() {

    this.subscriptionEditCategory = this.categoryService.editCategory(this.category).subscribe(() => {

      this.router.navigate(['admin/categories']);

    }, (error) => {

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
