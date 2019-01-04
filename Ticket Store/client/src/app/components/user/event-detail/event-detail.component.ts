import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { EventService } from '../../../core/services/event.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit, OnDestroy {

  public event: any;
  private getEventISubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private eventService: EventService) { }

  ngOnInit() {

    const eventId: number = this.route.params['value']['id'];

    this.getEventISubscription = this.eventService.getEventById(eventId).subscribe((event: any) => {

      this.event = event.data;
    });

  }

  ngOnDestroy(): void {

    if (this.getEventISubscription) {
      this.getEventISubscription.unsubscribe();
    }
  }
}
