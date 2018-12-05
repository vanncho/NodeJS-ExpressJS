import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { CategoryService } from '../../../core/services/category.service';


@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit, OnDestroy {

  private subscriptionCategoryAdd: ISubscription;
  private categoryName: string;

  constructor(private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit() {
  }

  private addCategory(): void {

    this.subscriptionCategoryAdd = this.categoryService.addCategory(this.categoryName).subscribe(() => {

      this.router.navigate(['admin/categories']);

    }, (error) => {

    });
  }

  ngOnDestroy(): void {

    if (this.subscriptionCategoryAdd) {
      this.subscriptionCategoryAdd.unsubscribe();
    }
  }
}
