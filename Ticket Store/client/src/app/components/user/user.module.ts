import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { userComponents } from './index';
import { AuthenticationService } from '../../core/services/authentication.service';
import { CartService } from '../../core/services/cart.service';

import { EventTimeFormatterPipe } from '../../core/pipes/event-time-formatter.pipe';
import { EventDateFormatterPipe } from '../../core/pipes/event-date-formatter.pipe';


@NgModule({
  declarations: [
    ...userComponents,
    EventTimeFormatterPipe,
    EventDateFormatterPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'home', component: userComponents[0] },
      { path: 'events', component: userComponents[1] },
      { path: 'events/:id', component: userComponents[2] },
      { path: 'events/tickets/:id', component: userComponents[3] }
    ]),
    FormsModule
  ],
  exports: [
    ...userComponents
  ],
  providers: [
    AuthenticationService,
    CartService
    ]
})

export class UserModule { }
