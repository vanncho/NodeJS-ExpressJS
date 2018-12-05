import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { userComponents } from './index';
import { AuthenticationService } from '../../core/services/authentication.service';


@NgModule({
  declarations: [
    ...userComponents,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ...userComponents
  ],
  providers: [
    AuthenticationService
    ]
})

export class UserModule { }
