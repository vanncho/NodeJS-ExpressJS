import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { userComponents } from './index';
import { AuthenticationService } from '../../core/services/authentication.service';

import { EventTimeFormatterPipe } from '../../core/pipes/event-time-formatter.pipe';
import { EventDateFormatterPipe } from '../../core/pipes/event-date-formatter.pipe';

// Guards
import { AuthGuard } from '../../core/guards/auth/auth.guard';


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
      { path: 'events/tickets/:id', component: userComponents[3] },
      { path: 'my/tickets', canActivate: [AuthGuard], component: userComponents[4] },
      { path: 'cart', canActivate: [AuthGuard], component: userComponents[5] },
      { path: 'cart/payment', canActivate: [AuthGuard], component: userComponents[6] }
    ]),
    FormsModule
  ],
  exports: [
    ...userComponents
  ],
  providers: [
    AuthenticationService,
    AuthGuard
    ]
})

export class UserModule { }
