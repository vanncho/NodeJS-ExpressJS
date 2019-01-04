import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '../../../core/services/authentication.service';
import { EventService } from '../../../core/services/event.service';
import { TicketService } from '../../../core/services/ticket.service';

import { EventListModel } from '../../../core/models/view/event-list.model';
import { TicketListModel } from '../../../core/models/view/ticket-list.model';


@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.css']
})
export class EventManagementComponent implements OnInit, OnDestroy {

  public searchedEvent: string;
  public events: Array<EventListModel>;
  private subscriptionGetAllEvents: Subscription;
  private subscriptionDeleteEvent: Subscription;
  private subscriptionDeleteTicket: Subscription;
  private subscriptionSearchEvent: Subscription;
  private subscriptionGetTicketsForEvent: Subscription;
  private tickets: Array<TicketListModel>;

  constructor(private eventService: EventService,
              private ticketService: TicketService,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.loadAllEvents();
  }

  getEventByTitle(): void {

    this.subscriptionSearchEvent = this.eventService.searchEventWithTitleLike(this.searchedEvent).subscribe((events: any) => {

      this.events = Object.values(events.data);
    }, error => {

      if (error.status === 401) {

        this.authenticationService.logout();
      }
    });

  }

  private loadAllEvents(): void {

    this.subscriptionGetAllEvents = this.eventService.getAllEvents().subscribe((events: any) => {

      this.events = Object.values(events.data);

    }, error => {

      if (error.status === 401) {

        this.authenticationService.logout();
      }
    });
  }

  private getTicketsForEvent(event, eventId): void {

    const classes = event.target.parentElement.parentElement.nextSibling.classList;

    this.changeButton(classes, eventId);
  }

  private changeButton(classes, eventId): void {

    if (classes.contains('hiddenRow')) {

      classes.remove('hiddenRow');
      classes.add('showedRow');

      this.getAllTicketsForTheEvent(eventId);

    } else {

      classes.remove('showedRow');
      classes.add('hiddenRow');

    }
  }

  private getAllTicketsForTheEvent(eventId: number): any {

    this.subscriptionGetTicketsForEvent = this.ticketService.getAllTickets(eventId).subscribe((tickets: any) => {

      this.tickets = Object.values(tickets.data);

    }, error => {

      if (error.status === 401) {

        this.authenticationService.logout();
      }
    });
  }

  private deleteEvent(eventId) {

    this.subscriptionDeleteEvent = this.eventService.deleteEvent(eventId).subscribe(() => {

      for (const event of this.events) {

        if (event.id === eventId) {

          const index = this.events.indexOf(eventId);
          this.events.splice(index, 1);
          break;
        }
      }

    }, error => {

      if (error.status === 401) {

        this.authenticationService.logout();
      }
    });
  }

  private deleteTicket(ticketId, eventId) {

    this.subscriptionDeleteTicket = this.ticketService.deleteTicket(ticketId).subscribe(() => {

      this.getAllTicketsForTheEvent(eventId);

    }, error => {

      if (error.status === 401) {

        this.authenticationService.logout();
      }
    });
  }

  ngOnDestroy(): void {

    if (this.subscriptionGetAllEvents) {
      this.subscriptionGetAllEvents.unsubscribe();
    }

    if (this.subscriptionDeleteEvent) {
      this.subscriptionDeleteEvent.unsubscribe();
    }

    if (this.subscriptionDeleteTicket) {
      this.subscriptionDeleteTicket.unsubscribe();
    }

    if (this.subscriptionSearchEvent) {
      this.subscriptionSearchEvent.unsubscribe();
    }

    if (this.subscriptionGetTicketsForEvent) {
      this.subscriptionGetTicketsForEvent.unsubscribe();
    }
  }
}
