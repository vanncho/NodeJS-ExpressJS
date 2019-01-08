import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { CartService } from '../../../core/services/cart.service';
import { HeaderService } from '../../../core/services/header.service';
import { TicketService } from '../../../core/services/ticket.service';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { ToastrService } from 'ngx-toastr';

import { CartList } from '../../../core/models/view/cart-list.model';
import { TicketEditModel } from '../../../core/models/binding/ticket-edit.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  public cart: Array<CartList>;
  public totalSum = 0;
  private getCartItemsISubscription: Subscription;
  private removeCartItemISubscription: Subscription;

  constructor(private cartService: CartService,
              private headerService: HeaderService,
              private ticketService: TicketService,
              private authenticationService: AuthenticationService,
              private toast: ToastrService) { }

  ngOnInit(): void {

    this.loadUserCart();
  }

  removeCartItem(cartItem: CartList): void {

    this.removeCartItemISubscription = this.cartService.removeFromCart(cartItem.id * 2).subscribe(() => {

      this.loadUserCart();

      const ticket = new TicketEditModel(cartItem.ticket.id, cartItem.ticket.count + cartItem.ticketsCount, null, null);
      this.ticketService.editTicket(ticket).subscribe(() => {});

    }, error => {

      if (error.status === 401) {

        this.authenticationService.logout();
      } else {
        this.toast.error(error.error);
      }
    });
  }

  private loadUserCart(): any {

    this.getCartItemsISubscription = this.cartService.getAll()
      .pipe(
        map(
          res => res.map(cartObj => {

            this.totalSum += cartObj.ticket.price * cartObj.ticketsCount;
            return new CartList().deserialize(cartObj);
          })
        )
      )
      .subscribe((cart: Array<CartList>) => {

        this.cart = cart;
        this.headerService.cartItems.next(cart.length);

      }, error => {

        if (error.status === 401) {

          this.authenticationService.logout();
        }

        console.log(error);
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
