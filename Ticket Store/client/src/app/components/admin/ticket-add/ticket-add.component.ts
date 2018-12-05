import { Component, OnInit, OnDestroy, trigger, transition, style, animate, keyframes } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';

import { TicketService } from '../../../core/services/ticket.service';
import { TicketAddModel } from '../../../core/models/binding/ticket-add.model';

@Component({
  selector: 'app-ticket-add',
  templateUrl: './ticket-add.component.html',
  styleUrls: ['./ticket-add.component.css'],
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
export class TicketAddComponent implements OnInit, OnDestroy {

  private subscriptionAddTicket: ISubscription;
  private rForm: FormGroup;
  private post: any;
  private ticket: TicketAddModel;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private ticketService: TicketService) {
    this.ticket = new TicketAddModel(0, 0, '', 0);
  }

  ngOnInit(): void {

    this.validateFrom();
    this.fillDataToModel();
  }

  private addTicket(): void {

    const eventId = this.route.params['value'].id;
    this.ticket['eventId'] = eventId;

    this.subscriptionAddTicket = this.ticketService.addTicket(this.ticket).subscribe(() => {

      this.router.navigate(['admin/events']);

    }, (error) => {

    });
  }

  private validateFrom(): void {

    this.rForm = this.formBuilder.group({
      'price': [0, Validators.compose([Validators.required, Validators.min(1)])],
      'ticketsCount': [0, Validators.compose([Validators.required, Validators.min(1)])],
      'priceCategory': [null, Validators.compose([Validators.required, Validators.minLength(3)])] // Regex => Validators.patern('')
    });
  }

  private fillDataToModel(): void {

    this.rForm.valueChanges.subscribe((data) => {

      this.ticket['price'] = data['price'];
      this.ticket['ticketsCount'] = data['ticketsCount'];
      this.ticket['priceCategory'] = data['priceCategory'];
    });
  }

  ngOnDestroy(): void {

    if (this.subscriptionAddTicket) {
      this.subscriptionAddTicket.unsubscribe();
    }
  }
}
