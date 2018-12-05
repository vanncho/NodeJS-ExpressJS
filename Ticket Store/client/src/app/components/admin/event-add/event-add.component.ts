import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { EventService } from '../../../core/services/event.service';
import { EventAddModel } from '../../../core/models/binding/event-add.model';

import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models/view/category.model';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent implements OnInit, OnDestroy {

  private subscriptionLoadCategories: ISubscription;
  private subscriptionAddEvent: ISubscription;
  private event: EventAddModel;
  private categories: Array<Category>;

  constructor(private eventService: EventService,
              private categoryService: CategoryService,
              private router: Router) {
    this.event = new EventAddModel('', '', '', '', '', '', '', 0);
   }

  ngOnInit() {
    this.loadCategories();
  }

  private addEvent(): void {

    this.subscriptionAddEvent = this.eventService.addEvent(this.event).subscribe(() => {

      this.router.navigate(['admin/events']);

    }, (error) => {

    });
  }

  private loadCategories(): void {

    this.subscriptionLoadCategories = this.categoryService.getAllCategories().subscribe((data) => {

      this.categories = Object.values(data);

    }, (error) => {

    });
  }

  ngOnDestroy(): void {

    if (this.subscriptionAddEvent) {
      this.subscriptionAddEvent.unsubscribe();
    }

    if (this.subscriptionLoadCategories) {
      this.subscriptionLoadCategories.unsubscribe();
    }
  }

}
