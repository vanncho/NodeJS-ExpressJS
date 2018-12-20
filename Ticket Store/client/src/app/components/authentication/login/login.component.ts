import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LoginModel } from '../../../core/models/binding/login.model';
import { AuthenticationService } from '../../../core/services/authentication.service';

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
export class LoginComponent implements OnInit {

  public lForm: FormGroup;
  public model: LoginModel;

  constructor(private authentication: AuthenticationService) {
    this.model = new LoginModel('', '');
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
  }

}
