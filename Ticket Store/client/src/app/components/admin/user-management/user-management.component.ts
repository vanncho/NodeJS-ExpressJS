import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../core/services/user.service';
import { AuthenticationService } from '../../../core/services/authentication.service';

import { UserEditModel } from '../../../core/models/binding/user-edit.model';
import { User } from '../../../core/models/view/user';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit, OnDestroy {

  public user: UserEditModel;
  public users: Array<User>;
  public searchedUsername: string;
  public enableDisableBtnName = 'Disable';
  private subscriptionGetAllUsers: Subscription;
  private subscriptionGetAllUsersByRole: Subscription;
  private subscriptionDisableEnableUser: Subscription;
  private subscriptionSearchUsers: Subscription;

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private toast: ToastrService) {
  }

  ngOnInit() {

    this.getAllUsers();
  }

  getAllUsersByRole(role): void {

    this.subscriptionGetAllUsersByRole = this.userService.getAllUsersByRole(role)
      .pipe(
        map(
          res => res.map(userObj => new User().deserialize(userObj))
        )
      )
      .subscribe((users: Array<User>) => {

        this.users = users;
      }, error => {

        if (error.status === 401) {

          this.authenticationService.logout();
        }
      });
  }

  disableEnableUser(event, userId, nonLocked): void {

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
        } else {
          this.toast.error(error.text);
        }
    });
  }

  getUsersByUsername(): void {

    this.subscriptionSearchUsers = this.userService.searchUsersWithUsernameLike(this.searchedUsername)
      .pipe(
        map(res => res.map(userObj => new User().deserialize(userObj)))
      )
      .subscribe((users: Array<User>) => {

        this.users = users;

      }, error => {

        if (error.status === 401) {

          this.authenticationService.logout();
        }
      });
  }

  getAllUsers(): void {

    this.subscriptionGetAllUsers = this.userService.getAllUsers()
    .pipe(
      map(
        res => res.map(userObj => new User().deserialize(userObj))
        )
    )
    .subscribe((users: Array<User>) => {

      this.users = users;

      }, error => {

        if (error.status === 401) {

          this.authenticationService.logout();
        }
    });
  }

  changeButton(event, classes) {

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
