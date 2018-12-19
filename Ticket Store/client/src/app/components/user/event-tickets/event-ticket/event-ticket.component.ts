import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';

import { TicketService } from '../../../../core/services/ticket.service';
import { CartService } from '../../../../core/services/cart.service';

import { TicketEditModel } from '../../../../core/models/binding/ticket-edit.model';

@Component({
  selector: 'app-event-ticket',
  templateUrl: './event-ticket.component.html',
  styleUrls: ['./event-ticket.component.css']
})
export class EventTicketComponent implements OnInit, OnDestroy {

  private getTicketsForEventsISubscription: ISubscription;
  private addToCartISubscription: ISubscription;
  private eventId: number;
  private tickets: Array<any>;
  private selectedTicket: any;
  private ticketsAmount: string;

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

        const ticket = new TicketEditModel(this.selectedTicket.id, this.selectedTicket.count - ticketCount, null, null);

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
