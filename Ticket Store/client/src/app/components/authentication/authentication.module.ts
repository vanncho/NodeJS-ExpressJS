import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { authenticationComponents } from './index';
import { AuthenticationService } from '../../core/services/authentication.service';


@NgModule({
  declarations: [
    ...authenticationComponents,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    ...authenticationComponents
  ],
  providers: [
    AuthenticationService
    ]
})

export class AuthenticationModule { }
