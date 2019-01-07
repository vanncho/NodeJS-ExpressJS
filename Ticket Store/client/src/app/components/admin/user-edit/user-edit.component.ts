import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '../../../core/services/user.service';
import { RoleService } from '../../../core/services/role.service';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { CookieManagerService } from '../../../core/services/cookie-manager.service';

import { UserEditModel } from '../../../core/models/binding/user-edit.model';
import { UserEditViewModel } from '../../../core/models/view/user-edit-view.model';
import { Role } from '../../../core/models/view/role';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {

  public user: UserEditViewModel;
  public role: Role;
  public roles: Array<Role>;
  private subscriptionGetUserById: Subscription;
  private subscriptionGetAllRoles: Subscription;
  private subscriptionUpdateUser: Subscription;
  private subscriptionLogoutUser: Subscription;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private roleService: RoleService,
              private toastr: ToastrService,
              private authenticationService: AuthenticationService,
              private cookieService: CookieManagerService,
              private router: Router) {
  }

  ngOnInit() {
    this.loadDataForView();
  }

  loadDataForView() {

    const userId = this.route.params['value'].id;
    this.subscriptionGetUserById = this.userService.getUserById(userId)
    .pipe(
      map(
        user => new UserEditViewModel().deserialize(user)
      )
    )
    .subscribe((foundUser: UserEditViewModel) => {

      this.subscriptionGetAllRoles = this.roleService.getAllRoles()
      .pipe(
        map(
          res => res.map(roleObj => new Role().deserialize(roleObj))
        )
      )
      .subscribe((rolesData: Array<Role>) => {

        this.user = foundUser;
        this.role = foundUser.role;
        this.roles = rolesData;

      }, error => {

      });
    });

  }

  updateUser() {

    const updateUser = new UserEditModel(
      this.user['id'],
      this.user['username'],
      this.user['first_name'],
      this.user['last_name'],
      this.user['email'],
      this.role.id,
      this.role.role,
      this.user['accountLocked']
    );

    this.subscriptionUpdateUser = this.userService.updateUser(updateUser).subscribe(() => {

      const loggedInUserId = Number(this.cookieService.get('userid'));

      if (this.user['id'] === loggedInUserId && this.role.role === 'USER') {

        this.authenticationService.logout();

      } else {
        this.toastr.success('Successfully edited.', 'User: ' + this.user['username']);

        setTimeout(() => {

          this.router.navigate(['admin/users']);
        }, 1000);
      }

    }, error => {

    });
  }

  compareRoles(o1: Role, o2: Role): boolean {

    if (o1 && o2 && o1.role === o2.role) {
      return true;
    }

    return false;
  }

  ngOnDestroy(): void {

    if (this.subscriptionGetUserById) {
      this.subscriptionGetUserById.unsubscribe();
    }

    if (this.subscriptionGetAllRoles) {
      this.subscriptionGetAllRoles.unsubscribe();
    }

    if (this.subscriptionUpdateUser) {
      this.subscriptionUpdateUser.unsubscribe();
    }

    if (this.subscriptionLogoutUser) {
      this.subscriptionLogoutUser.unsubscribe();
    }
  }
}
