import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';

import { AuthenticationService } from '../../../core/services/authentication.service';
import { TicketService } from '../../../core/services/ticket.service';

import { TicketEditModel } from '../../../core/models/binding/ticket-edit.model';


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

  private subscriptionGetTicketById: ISubscription;
  private subscriptionEditTicket: ISubscription;
  private rForm: FormGroup;
  private post: any;
  private ticket: TicketEditModel;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private ticketService: TicketService,
              private authenticationService: AuthenticationService) {
    this.ticket = new TicketEditModel(0, 0, 0, '');
  }

  ngOnInit(): void {

    this.getTicketById();
    this.validateForm(this.ticket.price, this.ticket.ticketsCount, this.ticket.priceCategory);
  }

  private getTicketById() {

    const ticketId = this.route.params['value'].id;

    this.ticketService.getTicketById(ticketId).subscribe((ticket: any) => {

      this.ticket = new TicketEditModel(ticket['data']['id'],
                                        ticket['data']['count'],
                                        ticket['data']['price'],
                                        ticket['data']['priceCategory']);

      this.validateForm(ticket['data']['price'],
                        ticket['data']['count'],
                        ticket['data']['priceCategory']);

    }, error => {

      if (error.status === 401) {

        this.authenticationService.logout();
      }
    });
  }

  private editTicket(): void {

    this.ticket['price'] = this.rForm.controls['price'].value;
    this.ticket['ticketsCount'] = this.rForm.controls['ticketsCount'].value;
    this.ticket['priceCategory'] = this.rForm.controls['priceCategory'].value;

    this.subscriptionEditTicket = this.ticketService.editTicket(this.ticket).subscribe(() => {

      this.router.navigate(['admin/events']);

    }, (error) => {

    });
  }

  private validateForm(price, ticketsCount, priceCategory): void {

    this.rForm = this.formBuilder.group({
      'price': [price, Validators.compose([Validators.required, Validators.min(1)])],
      'ticketsCount': [ticketsCount, Validators.compose([Validators.required, Validators.min(1)])],
      'priceCategory': [priceCategory, Validators.compose([Validators.required, Validators.minLength(3)])] // Regex => Validators.patern('')
    });
  }

  private fillDataToModel(): void {

    this.rForm.valueChanges.subscribe((data) => {

      this.ticket['price'] = data['price'];
      this.ticket['ticketsCount'] = data['ticketsCount'];
      this.ticket['priceCategory'] = data['priceCategory'];
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
