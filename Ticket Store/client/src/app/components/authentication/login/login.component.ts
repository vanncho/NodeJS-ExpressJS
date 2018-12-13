import { Component, OnInit, OnDestroy, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ISubscription } from 'rxjs/Subscription';

import { LoginModel } from '../../../core/models/binding/login.model';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { CookieManagerService } from '../../../core/services/cookie-manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
export class LoginComponent implements OnInit, OnDestroy {

  private lForm: FormGroup;
  public model: LoginModel;
  private subscription: ISubscription;
  public loginFail: boolean;
  public invalidUsername: boolean;
  public invalidPassword: boolean;

  constructor(private authentication: AuthenticationService,
              private cookieService: CookieManagerService,
              private toastr: ToastrService,
              // vcr: ViewContainerRef,
              private router: Router,
              private cdRef: ChangeDetectorRef) {
    this.model = new LoginModel('', '');
    // this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit(): void {

    this.lForm = new FormGroup({
      'username': new FormControl(this.model.username, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]),
      'password': new FormControl(this.model.password, [Validators.required, Validators.pattern(/^[A-Za-z0-9]{3,}$/)])
    });
  }

  login(): void {

    this.model['username'] = this.lForm.controls['username'].value;
    this.model['password'] = this.lForm.controls['password'].value;

    const loginModel = new LoginModel(
      this.model.username,
      this.model.password
    );

    this.authentication.login(loginModel);
//     this.subscription = this.authentication.login(loginModel).subscribe((data: any) => {

//       if (data.errors.length === 0) {

//         this.cookieService.saveLoginData(data.data);
//         this.loginFail = false;

//         this.router.navigate(['/user/home']).then((e) => {
// console.log(e)
//           this.toastr.success('You have login successfully.');
//         });
//       } else {

//         for (const e of data.errors) {
//           this.toastr.error(e);
//         }
//       }
//     });
  }

  ngOnDestroy(): void {
    this.cdRef.detach();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
