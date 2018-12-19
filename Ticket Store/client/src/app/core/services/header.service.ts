import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { UserType } from '../enumerations/user-type.enum';


@Injectable()
export class HeaderService {

  public loggedUserName: Subject<string> = new Subject();
  public menuSwitch: Subject<UserType> = new Subject();
  public cartItems: Subject<number> = new Subject();

  constructor() { }

}
