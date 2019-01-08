import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '../../../core/services/authentication.service';
import { TicketService } from '../../../core/services/ticket.service';

import { TicketEdit } from '../../../core/models/binding/ticket-edit.model';


@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.css'],
  animations: [
    trigger('alertAnim', [
    transition('void => *', [
        animate(400, keyframes([
            style({opacity: 0, transform: 'translateY(-20px)'}),
            style({opacity: 1, transform: 'translateY(0)'})
        ]))
    ])
])
]
})
export class TicketEditComponent implements OnInit, OnDestroy {

  public post: any;
  public rForm: FormGroup;
  private subscriptionGetTicketById: Subscription;
  private subscriptionEditTicket: Subscription;
  private ticket: TicketEdit;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private ticketService: TicketService,
              private authenticationService: AuthenticationService) {
    this.ticket = new TicketEdit(0, 0, 0, '');
  }

  ngOnInit(): void {

    this.getTicketById();
    this.validateForm(this.ticket.price, this.ticket.count, this.ticket.priceCategory);
  }

  getTicketById() {

    const ticketId = this.route.params['value'].id;

    this.ticketService.getTicketById(ticketId).subscribe((ticket: TicketEdit) => {

      this.ticket = new TicketEdit(ticket.id,
                                        ticket.count,
                                        ticket.price,
                                        ticket.priceCategory);

      this.validateForm(ticket.price,
                        ticket.count,
                        ticket.priceCategory);

    }, error => {

      if (error.status === 401) {

        this.authenticationService.logout();
      } else {
        console.log(error);
      }
    });
  }

  editTicket(): void {

    this.ticket.price = this.rForm.controls['price'].value;
    this.ticket.count = this.rForm.controls['count'].value;
    this.ticket.priceCategory = this.rForm.controls['priceCategory'].value;

    this.subscriptionEditTicket = this.ticketService.editTicket(this.ticket).subscribe(() => {

      this.router.navigate(['admin/events']);

    }, error => {

      if (error.status === 401) {

        this.authenticationService.logout();
      } else {
        console.log(error);
      }
    });
  }

  validateForm(price, ticketsCount, priceCategory): void {

    this.rForm = this.formBuilder.group({
      'price': [price, Validators.compose([Validators.required, Validators.min(1)])],
      'count': [ticketsCount, Validators.compose([Validators.required, Validators.min(1)])],
      'priceCategory': [priceCategory, Validators.compose([Validators.required, Validators.minLength(3)])] // Regex => Validators.patern('')
    });
  }

  fillDataToModel(): void {

    this.rForm.valueChanges.subscribe((data) => {

      this.ticket.price = data['price'];
      this.ticket.count = data['count'];
      this.ticket.priceCategory = data['priceCategory'];
    });
  }

  ngOnDestroy() {

    if (this.subscriptionGetTicketById) {
      this.subscriptionGetTicketById.unsubscribe();
    }

    if (this.subscriptionEditTicket) {
      this.subscriptionEditTicket.unsubscribe();
    }
  }
}
