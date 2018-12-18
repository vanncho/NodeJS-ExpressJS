import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClientService } from './http-client.service';
import { AuthenticationUtility } from '../utils/authentication.util';

@Injectable()
export class CartService {

    constructor(private authUtil: AuthenticationUtility,
        private httpClientService: HttpClientService) {
    }

    addToCart(cartObj): Observable<Object> {

        return this.httpClientService.post('/api/cart', JSON.stringify(cartObj), this.authUtil.headersBasic());
    }
}
