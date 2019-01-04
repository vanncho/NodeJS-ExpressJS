import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private toastr: ToastrService) { }

  ngOnInit() {
  }

  buy(): void {
    this.toastr.info('Thanks for buying these tickets. This functionality is not available.');
  }
}
