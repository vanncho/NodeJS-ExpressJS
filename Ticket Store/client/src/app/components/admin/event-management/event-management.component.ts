import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';

import { AuthenticationService } from '../../../core/services/authentication.service';
import { EventService } from '../../../core/services/event.service';
import { EventListModel } from '../../../core/models/view/event-list.model';
import { TicketService } from '../../../core/services/ticket.service';


@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.css']
})
export class EventManagementComponent implements OnInit, OnDestroy {

  private subscriptionGetAllEvents: ISubscription;
  private subscriptionDeleteEvent: ISubscription;
  private subscriptionDeleteTicket: ISubscription;
  private subscriptionSearchEvent: ISubscription;
  private events: Array<EventListModel>;
  private searchedEvent: string;

  constructor(private eventService: EventService,
              private ticketService: TicketService,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.loadAllEvents();
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

    const classes = event.target.parentElement.parentElement.nextSibling.nextSibling.classList;

    this.changeButton(classes);
  }

  private changeButton(classes): void {

    if (classes.contains('hiddenRow')) {

      classes.remove('hiddenRow');
      classes.add('showedRow');

    } else {

      classes.remove('showedRow');
      classes.add('hiddenRow');

    }
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

      let breakOuter = false;

      for (const event of this.events) {

        for (const ticket of event.tickets) {

          if (ticket.id === ticketId) {

            const indexOfTicket = event.tickets.indexOf(ticketId);
            event.tickets.splice(indexOfTicket, 1);
            breakOuter = true;
            break;
          }
        }

        if (breakOuter) {
          break;
        }
      }

    }, error => {

      if (error.status === 401) {

        this.authenticationService.logout();
      }
    });
  }

  private getEventByTitle(): void {

    if (this.searchedEvent.length > 0) {

      this.subscriptionSearchEvent = this.eventService.searchEventWithTitleLike(this.searchedEvent).subscribe((events: any) => {

        this.events = Object.values(events.data);
      }, error => {

        if (error.status === 401) {

          this.authenticationService.logout();
        }
      });
    }

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
  }
}
