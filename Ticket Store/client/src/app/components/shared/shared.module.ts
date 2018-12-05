import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { sharedComponents } from './index';
import { AuthenticationService } from '../../core/services/authentication.service';


@NgModule({
  declarations: [
    ...sharedComponents,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ...sharedComponents
  ],
  providers: [
    AuthenticationService
    ]
})

export class SharedModule { }
