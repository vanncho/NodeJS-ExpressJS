import { Component, OnDestroy, OnInit, ViewContainerRef, trigger, transition, style, animate, keyframes } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { ISubscription } from 'rxjs/Subscription';

import { RegisterModel } from '../../../core/models/binding/register.model';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
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
export class RegisterComponent implements OnInit, OnDestroy {

  private rForm: FormGroup;
  private post: any;
  private subscription: ISubscription;
  public model: RegisterModel;
  public registeredUser: string;
  public registerSuccess: boolean;

  constructor(private authentication: AuthenticationService,
              private toastr: ToastsManager, vcr: ViewContainerRef,
              private router: Router,
              private toasterOptions: ToastOptions) {
    this.model = new RegisterModel('', '', '', '', '', '');
    this.toastr.setRootViewContainerRef(vcr);
    this.toasterOptions.dismiss = 'click';
  }

  ngOnInit(): void {

    this.rForm = new FormGroup({
      'firstName': new FormControl(this.model.firstName, [Validators.required, Validators.pattern(/^([A-Z]+[a-z]+)$/)]),
      'lastName': new FormControl(this.model.lastName, [Validators.required, Validators.pattern(/^([A-Z]+[a-z]+)$/)]),
      'username': new FormControl(this.model.username, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]),
      'email': new FormControl(this.model.email, [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]),
      'password': new FormControl(this.model.password, [Validators.required, Validators.pattern(/^[A-Za-z0-9]{3,}$/)]),
      'confirmPassword': new FormControl(this.model.confirmPassword, [Validators.required, Validators.pattern(/^[A-Za-z0-9]{3,}$/)])
    });
  }

  private register(): void {

    this.model['firstName'] = this.rForm.controls['firstName'].value;
    this.model['lastName'] = this.rForm.controls['lastName'].value;
    this.model['email'] = this.rForm.controls['email'].value;
    this.model['username'] = this.rForm.controls['username'].value;
    this.model['password'] = this.rForm.controls['password'].value;

    const registerModel = new RegisterModel(
      this.model.firstName,
      this.model.lastName,
      this.model.username,
      this.model.email,
      this.model.password
    );

    this.subscription = this.authentication.register(registerModel).subscribe((data: any) => {

      if (data.errors.length === 0) {

        this.successfulRegister(data);
        this.toastr.success('Registration successfully.');
        this.router.navigate(['/login']);
      } else {

        for (const e of data.errors) {
          this.toastr.error(e);
        }
      }
    });
  }

  private successfulRegister(data): void {
    this.registerSuccess = true;
    this.registeredUser = data['username'];
  }

  ngOnDestroy(): void {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
