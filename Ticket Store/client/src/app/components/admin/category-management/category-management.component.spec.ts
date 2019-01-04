import { CategoryManagementComponent } from './category-management.component';
import { CategoryService } from '../../../core/services/category.service';

import { Observable } from 'rxjs';
// import 'rxjs/add/observable/from';
// import { fromPromise } from 'rxjs';
import { from } from 'rxjs';

import { Category } from '../../../core/models/view/category.model';


describe('CategoryManagementComponent', () => {

  let categoryManagementComponent: CategoryManagementComponent;
  let categoryService: CategoryService;
  let categories: Array<Category>;
  let categoryId: number;

  beforeEach(() => {
    categoryService = new CategoryService(null, null);
    categoryManagementComponent = new CategoryManagementComponent(categoryService, null, null);

    categories = [{
        id: 1,
        name: 'Sport'
      }, {
        id: 2,
        name: 'Theater'
      }, {
        id: 3,
        name: 'Concerts'
      }];
  });

  it('should set property with categories in the component, returned from server', () => {

    const fakeDBObject: any = { data: categories, errors: [] };

    spyOn(categoryService, 'getAllCategories').and.callFake(() => {
      return Observable.from([fakeDBObject]);
    });

    categoryManagementComponent.ngOnInit();

    expect(categoryService.getAllCategories).toHaveBeenCalled();
    expect(categoryManagementComponent.categories).toEqual(fakeDBObject.data);
  });

  it('should successfully delete category by valid id', () => {

    const fakeDBObject: any = { data: 'Success', errors: [] };
    categoryId = 2;

    categoryManagementComponent.categories = categories;

    spyOn(categoryService, 'deleteCategory').and.callFake(() => {
      return Observable.from([fakeDBObject]);
    });

    categoryManagementComponent.deleteCategory(categoryId);

    expect(categoryService.deleteCategory).toHaveBeenCalled();
    expect(categoryManagementComponent.categories.length).toEqual(2);
  });

  it('should get error when delete category by invalid id', () => {

    const fakeDBObject: any = { data: 'Error', errors: ['Category with provided id does not exists!'] };
    categoryId = 4;

    categoryManagementComponent.categories = categories;

    const obs = spyOn(categoryService, 'deleteCategory').and.callFake(() => {
      return Observable.from([fakeDBObject]);
    });

    categoryManagementComponent.deleteCategory(categoryId);

    obs().subscribe(data => {
      expect(data.data).toEqual('Error');
      expect(data.errors[0]).toEqual('Category with provided id does not exists!');
      expect(categoryService.deleteCategory).toHaveBeenCalled();
      expect(categoryManagementComponent.categories.length).toEqual(3);
    });

  });
});
