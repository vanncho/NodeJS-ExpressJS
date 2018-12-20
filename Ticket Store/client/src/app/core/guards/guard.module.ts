import { NgModule } from '@angular/core';
import { GuardsModules } from './index';
import { CommonModule } from '@angular/common';

import { AuthenticationService } from '../../core/services/authentication.service';


@NgModule({
  declarations: [
    // ...GuardsModules
  ],
  imports: [
    CommonModule
  ],
  exports: [
    // ...GuardsModules
  ],
  providers: [
    AuthenticationService,
    ...GuardsModules
  ]
})

export class GuardModule { }
