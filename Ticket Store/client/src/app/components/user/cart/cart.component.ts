import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { CartService } from '../../../core/services/cart.service';
import { HeaderService } from '../../../core/services/header.service';
import { TicketService } from '../../../core/services/ticket.service';
import { AuthenticationService } from '../../../core/services/authentication.service';

import { CartList } from '../../../core/models/view/cart-list.model';
import { TicketEditModel } from '../../../core/models/binding/ticket-edit.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  public cart: Array<CartList>;
  public totalSum: number;
  private getCartItemsISubscription: Subscription;
  private removeCartItemISubscription: Subscription;

  constructor(private cartService: CartService,
              private headerService: HeaderService,
              private ticketService: TicketService,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {

    this.loadUserCart();
  }

  removeCartItem(cartItem: CartList): void {

    this.removeCartItemISubscription = this.cartService.removeFromCart(cartItem.id).subscribe(() => {

      this.loadUserCart();

      const ticket = new TicketEditModel(cartItem.ticket.id, cartItem.ticket.count + cartItem.ticketsCount, null, null);
      this.ticketService.editTicket(ticket).subscribe(() => {});

    }, error => {

      if (error.status === 401) {

        this.authenticationService.logout();
      }
    });
  }

  private loadUserCart(): any {

    this.getCartItemsISubscription = this.cartService.getAll().subscribe((cart: any) => {

      this.cart = [];
      this.totalSum = 0;
      let currCartItem: CartList;
      this.headerService.cartItems.next(cart.data.length);

      for (const cartItem of cart.data) {

        currCartItem = new CartList(cartItem.id, cartItem.event, cartItem.ticket, cartItem.ticketsCount);
        this.totalSum += cartItem.ticket.price * cartItem.ticketsCount;
        this.cart.push(currCartItem);

      }
    }, error => {

      if (error.status === 401) {

        this.authenticationService.logout();
      }
    });
  }

  ngOnDestroy(): void {

    if (this.getCartItemsISubscription) {
      this.getCartItemsISubscription.unsubscribe();
    }

    if (this.removeCartItemISubscription) {
      this.removeCartItemISubscription.unsubscribe();
    }
  }

}
