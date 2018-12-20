import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { UserType } from '../enumerations/user-type.enum';


@Injectable()
export class HeaderService {

  public loggedUserName: BehaviorSubject<string> = new BehaviorSubject('');
  public menuSwitch: BehaviorSubject<UserType> = new BehaviorSubject(UserType.USER);
  public cartItems: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() { }

}
