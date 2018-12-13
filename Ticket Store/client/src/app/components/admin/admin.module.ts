import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminGuard } from '../../core/guards/admin/admin.guard';
import { AuthenticationService } from '../../core/services/authentication.service';

import { adminComponents } from './index';


@NgModule({
    declarations: [
        ...adminComponents
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([ // Lazy loading !
            {path: 'home', canActivate: [AdminGuard], component: adminComponents[0]},
            // {path: 'users', canActivate: [AdminGuard], component: adminComponents[1]},
            {path: 'users', component: adminComponents[1]},
            {path: 'users/edit/:id', canActivate: [AdminGuard], component: adminComponents[2]},
            {path: 'categories', canActivate: [AdminGuard], component: adminComponents[3]},
            {path: 'categories/add', canActivate: [AdminGuard], component: adminComponents[4]},
            {path: 'categories/edit/:id', canActivate: [AdminGuard], component: adminComponents[5]},
            {path: 'events', canActivate: [AdminGuard], component: adminComponents[6]},
            {path: 'events/add', canActivate: [AdminGuard], component: adminComponents[7]},
            {path: 'events/add/ticket/:id', canActivate: [AdminGuard], component: adminComponents[8]},
            {path: 'events/edit/:id', canActivate: [AdminGuard], component: adminComponents[9]},
            {path: 'events/edit/ticket/:id', canActivate: [AdminGuard], component: adminComponents[10]},
        ]),
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        ...adminComponents
    ],
    providers: [
        AuthenticationService
    ]
})

export class AdminModule { }
