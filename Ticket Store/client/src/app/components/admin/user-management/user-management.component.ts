import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '../../../core/services/user.service';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { CookieManagerService } from '../../../core/services/cookie-manager.service';

import { UserEditModel } from '../../../core/models/binding/user-edit.model';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit, OnDestroy {

  private subscriptionGetAllUsers: ISubscription;
  private subscriptionGetAllUsersByRole: ISubscription;
  private subscriptionDisableEnableUser: ISubscription;
  private subscriptionSearchUsers: ISubscription;
  private user: UserEditModel;
  private users: Array<UserEditModel>;
  private searchedUsername: string;

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private toastr: ToastrService,
              private router: Router,
              private cookie: CookieManagerService) {
    // this.users = [];
  }

  ngOnInit() {

    this.getAllUsers();
  }

  private getAllUsers(): void {

    this.subscriptionGetAllUsers = this.userService.getAllUsers().subscribe((users: any) => {

      this.users = Object.values(users.data);

      }, error => {

        if (error.status === 401) {

          this.authenticationService.logout();
        }
    });
  }

  private getAllUsersByRole(role): void {

    this.subscriptionGetAllUsersByRole = this.userService.getAllUsersByRole(role).subscribe((users: any) => {

      this.users = Object.values(users.data);

      }, error => {

        if (error.status === 401) {

          this.authenticationService.logout();
        }
      });
  }

  private disableEnableUser(event, userId, nonLocked): void {

    const classes = event.target.classList;

    const userData = {
      id: userId,
      nonLocked: nonLocked
    };

    this.subscriptionDisableEnableUser = this.userService.disableEnableUser(userData).subscribe(() => {

      this.changeButton(event, classes);

      }, error => {

        if (error.status === 401) {

          this.authenticationService.logout();
        }
    });
  }

  private getUsersByUsername(): void {

    if (this.searchedUsername.length > 0) {

      this.subscriptionSearchUsers = this.userService.searchUsersWithUsernameLike(this.searchedUsername).subscribe((usersFromDb) => {

        this.users = Object.values(usersFromDb);

      }, error => {

        if (error.status === 401) {

          this.authenticationService.logout();
        }
      });
    }
  }

  private changeButton(event, classes) {

    if (classes.contains('btn-danger')) {

      classes.remove('btn-danger');
      classes.add('btn-success');
      event.srcElement.innerText = 'Enable';
    } else {

      classes.remove('btn-success');
      classes.add('btn-danger');
      event.srcElement.innerText = 'Disable';
    }
  }

  ngOnDestroy(): void {

    if (this.subscriptionGetAllUsers) {
      this.subscriptionGetAllUsers.unsubscribe();
    }

    if (this.subscriptionGetAllUsersByRole) {
      this.subscriptionGetAllUsersByRole.unsubscribe();
    }

    if (this.subscriptionDisableEnableUser) {
      this.subscriptionDisableEnableUser.unsubscribe();
    }

    if (this.subscriptionSearchUsers) {
      this.subscriptionSearchUsers.unsubscribe();
    }
  }
}
