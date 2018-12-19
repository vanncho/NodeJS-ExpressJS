import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClientService } from './http-client.service';
import { AuthenticationUtility } from '../utils/authentication.util';

@Injectable()
export class CartService {

    constructor(private authUtil: AuthenticationUtility,
        private httpClientService: HttpClientService) {
    }

    addToCart(cartObj: object): Observable<Object> {

        return this.httpClientService.post('/api/cart', JSON.stringify(cartObj), this.authUtil.headersBasic());
    }

    getAll(): Observable<Object> {

        return this.httpClientService.get('/api/cart', this.authUtil.headersBasic());
    }

    getCartItems(): Observable<Object> {

        return this.httpClientService.get('/api/cartItems', this.authUtil.headersBasic());
    }

    removeFromCart(cartId: number): Observable<Object> {

        return this.httpClientService.delete('/api/removeFromCart/' + cartId, this.authUtil.headersBasic());
    }
}
