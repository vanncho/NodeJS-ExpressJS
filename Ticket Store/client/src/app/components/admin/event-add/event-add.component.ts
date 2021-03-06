import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { EventService } from '../../../core/services/event.service';
import { EventAddModel } from '../../../core/models/binding/event-add.model';

import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models/view/category.model';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent implements OnInit, OnDestroy {

  public event: EventAddModel;
  public categories: Category[];
  private subscriptionLoadCategories: Subscription;
  private subscriptionAddEvent: Subscription;

  constructor(private eventService: EventService,
              private categoryService: CategoryService,
              private authenticationService: AuthenticationService,
              private router: Router) {
    this.event = new EventAddModel('', '', '', '', '', '', '', 0);
   }

  ngOnInit() {
    this.loadCategories();
  }

  addEvent(): void {

    this.subscriptionAddEvent = this.eventService.addEvent(this.event).subscribe(() => {

      this.router.navigate(['admin/events']);

    }, error => {

      if (error.status === 401) {

        this.authenticationService.logout();
      }
    });
  }

  loadCategories(): void {

    this.subscriptionLoadCategories = this.categoryService.getAllCategories().subscribe((categories: any) => {

      this.categories = Object.values(categories.data);

    }, error => {

      if (error.status === 401) {

        this.authenticationService.logout();
      }
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
