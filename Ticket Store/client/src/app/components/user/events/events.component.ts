import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';

import { EventService } from '../../../core/services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit, OnDestroy {

  private events: Array<any> = [];
  private getAllEventsISubscription: ISubscription;

  constructor(private eventService: EventService) { }

  ngOnInit() {

    this.getAllEvents();
  }

  private getAllEvents() {

    this.getAllEventsISubscription = this.eventService.getAllEvents().subscribe((events: any) => {

      this.events = Object.values(events.data);
    });
  }

  ngOnDestroy(): void {

    if (this.getAllEventsISubscription) {

      this.getAllEventsISubscription.unsubscribe();
    }
  }
}