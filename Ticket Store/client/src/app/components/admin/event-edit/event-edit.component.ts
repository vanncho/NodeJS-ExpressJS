import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from '../../../core/services/authentication.service';
import { EventService } from '../../../core/services/event.service';
import { CategoryService } from '../../../core/services/category.service';
import { DateUtility } from '../../../core/utils/date.util';

import { EventEditModel } from '../../../core/models/binding/event-edit.model';
import { Category } from '../../../core/models/view/category.model';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit, OnDestroy {

  public event: EventEditModel;
  public categories: Array<Category>;
  private subscriptionGetEvent: Subscription;
  private subscriptionLoadCategories: Subscription;
  private subscriptionEditEvent: Subscription;

  constructor(private eventService: EventService,
              private categoryService: CategoryService,
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              private dateUtil: DateUtility) {
    this.event = new EventEditModel(0, '', '', '', '', '', '', '', 0);
  }

  ngOnInit(): void {

    this.getEventById();
    this.loadCategories();
  }

  getEventById(): void {

    const eventId = this.route.params['value'].id;

    this.subscriptionGetEvent = this.eventService.getEventById(eventId).subscribe((event: any) => {

      this.event = new EventEditModel(
        event['data']['id'],
        event['data']['title'],
        event['data']['url'],
        event['data']['location'],
        this.dateUtil.formatDateToYYYYMMdd(event['data']['date']),
        event['data']['time'],
        event['data']['town'],
        event['data']['description'],
        event['data']['categoryId']
      );

    }, error => {

      if (error.status === 401) {

        this.authenticationService.logout();
      }
    });
  }

  editEvent() {

    this.subscriptionEditEvent = this.eventService.editEvent(this.event).subscribe(() => {

      this.router.navigate(['admin/events']).then(() => {
        this.toastr.success('Successfully edited.', this.event['title']);
      });

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

  compareCategory(o1: number, o2: number): boolean {

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
