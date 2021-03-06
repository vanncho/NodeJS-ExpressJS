import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../core/services/category.service';
import { AuthenticationService } from '../../../core/services/authentication.service';


@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit, OnDestroy {

  public categoryName: string;
  private subscriptionCategoryAdd: Subscription;

  constructor(private categoryService: CategoryService,
              private authenticationService: AuthenticationService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit() {
  }

  addCategory(): void {

    this.subscriptionCategoryAdd = this.categoryService.addCategory(this.categoryName).subscribe(() => {

      this.router.navigate(['/admin/categories']).then(() => {
        this.toastr.success('Category added successfully.');
      });

    }, error => {

      if (error.status === 401) {

        this.authenticationService.logout();
      } else {
        console.log(error);
      }
    });
  }

  ngOnDestroy(): void {

    if (this.subscriptionCategoryAdd) {
      this.subscriptionCategoryAdd.unsubscribe();
    }
  }
}
