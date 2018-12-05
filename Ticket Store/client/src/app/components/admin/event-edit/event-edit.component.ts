import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { EventService } from '../../../core/services/event.service';
import { EventEditModel } from '../../../core/models/binding/event-edit.model';

import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models/view/category.model';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit, OnDestroy {

  private subscriptionGetEvent: ISubscription;
  private subscriptionLoadCategories: ISubscription;
  private subscriptionEditEvent: ISubscription;
  private event: EventEditModel;
  private categories: Array<Category>;

  constructor(private eventService: EventService,
              private categoryService: CategoryService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastsManager, vcr: ViewContainerRef) {
    this.event = new EventEditModel(0, '', '', '', '', '', '', '', 0);
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit(): void {

    this.getEventById();
    this.loadCategories();
  }

  private getEventById(): void {

    const eventId = this.route.params['value'].id;

    this.subscriptionGetEvent = this.eventService.getEventById(eventId).subscribe((data) => {

      this.event = new EventEditModel(
        data['id'],
        data['title'],
        data['url'],
        data['location'],
        data['date'],
        data['time'],
        data['town'],
        data['description'],
        data['categoryId']
      );

    }, (error) => {

    });
  }

  private editEvent() {

    this.subscriptionEditEvent = this.eventService.editEvent(this.event).subscribe(() => {

      this.toastr.success('Successfully edited.', this.event['title']);
      setTimeout(() => {
        this.router.navigate(['admin/events']);
      }, 900);

    }, (error) => {

    });
  }

  private loadCategories(): void {

    this.subscriptionLoadCategories = this.categoryService.getAllCategories().subscribe((data) => {

      this.categories = Object.values(data);

    }, (error) => {

    });
  }

  private compareCategory(o1: number, o2: number): boolean {

    if (o1 === o2) {
      return true;
    }

    return false;
  }

  ngOnDestroy(): void {

    if (this.subscriptionGetEvent) {
      this.subscriptionGetEvent.unsubscribe();
    }

    if (this.subscriptionLoadCategories) {
      this.subscriptionLoadCategories.unsubscribe();
    }
  }
}
