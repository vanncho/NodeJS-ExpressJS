import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpClientService } from './http-client.service';
import { AuthenticationUtility } from '../utils/authentication.util';

@Injectable()
export class CategoryService {

    constructor(private authUtil: AuthenticationUtility,
                private httpClientService: HttpClientService) {
    }

    getAllCategories(): Observable<Object> {

        return this.httpClientService.get('/api/allCategories', this.authUtil.headersBasic());
    }

    addCategory(name): Observable<Object> {

        return this.httpClientService.post('/api/addCategory', JSON.stringify({name: name}), this.authUtil.headersBasic());
    }

    getCategoryById(categoryId): Observable<Object> {

        return this.httpClientService.get('/api/getCategory/' + categoryId, this.authUtil.headersBasic);
    }

    editCategory(category): Observable<Object> {

        return this.httpClientService.post('/api/editCategory', JSON.stringify(category), this.authUtil.headersBasic());
    }

    deleteCategory(categoryId): Observable<Object> {

        return this.httpClientService.delete('/api/deleteCategory/' + categoryId, this.authUtil.headersBasic());
    }

    searchCategoryWithNameLike(name): Observable<Object> {

        return this.httpClientService.post('/api/searchCategory', name, this.authUtil.headersBasic);
    }
}
