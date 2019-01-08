import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { TicketService } from '../../../../core/services/ticket.service';
import { CartService } from '../../../../core/services/cart.service';

import { TicketEdit } from '../../../../core/models/binding/ticket-edit.model';

@Component({
  selector: 'app-event-ticket',
  templateUrl: './event-ticket.component.html',
  styleUrls: ['./event-ticket.component.css']
})
export class EventTicketComponent implements OnInit, OnDestroy {

  public tickets: any[];
  public ticketsAmount: string;
  private getTicketsForEventsISubscription: Subscription;
  private addToCartISubscription: Subscription;
  private eventId: number;
  private selectedTicket: any;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private cartService: CartService,
              private ticketService: TicketService) { }

  ngOnInit(): void {

    this.selectedTicket = {};
    this.eventId = this.route.params['value']['id'];

    this.getTicketsForEventsISubscription = this.ticketService.getAllTickets(this.eventId).subscribe((tickets: any) => {

      this.tickets = Object.values(tickets.data);
    });
  }

  addTicketsToCart() {

    const ticketCount = Number(this.ticketsAmount);
    const ticketProps = (Object.keys(this.selectedTicket)).length;

    if (ticketProps > 0 && (isNaN(ticketCount) === false)) {

      const cartObj = {
        eventId: this.eventId,
        ticketId: this.selectedTicket.id,
        count: this.ticketsAmount
      };

      this.addToCartISubscription = this.cartService.addToCart(cartObj).subscribe(() => {

        const ticket = new TicketEdit(this.selectedTicket.id, this.selectedTicket.count - ticketCount, null, null);

        this.ticketService.editTicket(ticket).subscribe(() => {

          this.router.navigate([`/user/events/${this.eventId}`]);
        });

      }, error => {

        if (error.status === 401) {

          this.router.navigate(['/login']);
        }
      });
    }
  }

  ngOnDestroy(): void {

    if (this.getTicketsForEventsISubscription) {
      this.getTicketsForEventsISubscription.unsubscribe();
    }

    if (this.addToCartISubscription) {
      this.addToCartISubscription.unsubscribe();
    }
  }
}
