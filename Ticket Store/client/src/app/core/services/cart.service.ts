import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { CartList } from '../models/view/cart-list.model';
import { AuthenticationUtility } from '../utils/authentication.util';

@Injectable()
export class CartService {

    constructor(private authUtil: AuthenticationUtility,
        private httpClient: HttpClient) {
    }

    addToCart(cartObj: object): Observable<Object> {

        return this.httpClient.post<Object>('/api/cart', JSON.stringify(cartObj), this.authUtil.headersBasic());
    }

    getAll(): Observable<CartList[]> {

        return this.httpClient.get<CartList[]>('/api/cart');
    }

    getCartItems(): Observable<number> {

        return this.httpClient.get<number>('/api/cartItems');
    }

    removeFromCart(cartId: number): Observable<Object> {

        return this.httpClient.delete<Object>('/api/removeFromCart/' + cartId, this.authUtil.headersBasic());
    }
}
