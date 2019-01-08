import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { AuthenticationUtility } from '../utils/authentication.util';
import { Category } from '../models/view/category.model';

@Injectable()
export class CategoryService {

    constructor(private authUtil: AuthenticationUtility,
                private httpClient: HttpClient) {
    }

    getAllCategories(): Observable<Category[]> {

        return this.httpClient.get<Category[]>('/api/allCategories');
    }

    addCategory(name): Observable<Object> {

        return this.httpClient.post<Object>('/api/addCategory', JSON.stringify({ name: name }), this.authUtil.headersBasic());
    }

    getCategoryById(categoryId): Observable<Category> {

        return this.httpClient.get<Category>('/api/getCategory/' + categoryId);
    }

    editCategory(category): Observable<Object> {

        return this.httpClient.post<Object>('/api/editCategory', JSON.stringify(category), this.authUtil.headersBasic());
    }

    deleteCategory(categoryId): Observable<Object> {

        return this.httpClient.delete<Object>('/api/deleteCategory/' + categoryId, this.authUtil.headersBasic());
    }

    searchCategoryWithNameLike(name): Observable<Category[]> {

        return this.httpClient.post<Category[]>('/api/searchCategory', JSON.stringify({ categoryName: name }), this.authUtil.headersBasic());
    }
}
