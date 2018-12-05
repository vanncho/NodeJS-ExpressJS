import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { AppComponent } from '../../../app.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { UserService } from '../../../core/services/user.service';
import { RoleService } from '../../../core/services/role.service';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { CookieManagerService } from '../../../core/services/cookie-manager.service';

import { UserEditModel } from '../../../core/models/binding/user-edit.model';
import { UserEditViewModel } from '../../../core/models/view/user-edit-view.model';
import { UserType } from '../../../core/enumerations/user-type.enum';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {

  private subscriptionGetUserById: ISubscription;
  private subscriptionGetAllRoles: ISubscription;
  private subscriptionUpdateUser: ISubscription;
  private subscriptionLogoutUser: ISubscription;
  private user: UserEditViewModel;
  private currentUserRole: string;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private roleService: RoleService,
              private toastr: ToastsManager, vcr: ViewContainerRef,
              private authentication: AuthenticationService,
              private cookieService: CookieManagerService,
              private router: Router,
              private app: AppComponent) {
    this.user = new UserEditViewModel(0, '', '', '', '', '', []);
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.loadDataForView();
  }

  private loadDataForView() {

    const userId = this.route.params['value'].id;
    this.subscriptionGetUserById = this.userService.getUserById(userId).subscribe((userToEdit: any) => {

      this.subscriptionGetAllRoles = this.roleService.getAllRoles().subscribe((rolesData: any) => {

        this.user = new UserEditViewModel(
          userToEdit['data']['id'],
          userToEdit['data']['username'],
          userToEdit['data']['first_name'],
          userToEdit['data']['last_name'],
          userToEdit['data']['email'],
          userToEdit['data']['role'],
          Object.values(rolesData.data)
        );

        this.currentUserRole = userToEdit['data']['role'].toUpperCase();

      }, (error) => {

      });
    });

  }

  private updateUser() {

    const updateUser = new UserEditModel(
      this.user['id'],
      this.user['username'],
      this.user['firstName'],
      this.user['lastName'],
      this.user['email'],
      'ROLE_' + this.currentUserRole,
      this.user['accountLocked']
    );

    this.subscriptionUpdateUser = this.userService.updateUser(updateUser).subscribe(() => {

      const loggedInUserId = Number(this.cookieService.get('userid'));

      if (this.user['id'] === loggedInUserId && this.currentUserRole === 'USER') {

        this.subscriptionLogoutUser = this.authentication.logout().subscribe(() => {

          this.app.setMenuTo(UserType.USER);
          this.cookieService.removeLoginData();

          this.toastr.success('You have logout successfully.');
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 900);

        }, err => {
          this.toastr.error(err.error.description);
        });

      } else {
        this.toastr.success('Successfully edited.', 'User: ' + this.user['username']);

        setTimeout(() => {

          this.router.navigate(['admin/users']);
        }, 1000);
      }

    }, (error) => {

    });
  }

  private compareRoles(o1: string, o2: string): boolean {

    if (o1 === o2) {
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
