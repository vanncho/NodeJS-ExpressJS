import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  // private currentUserRole: string;
  private currentUserRole: { id: number, name: string };

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private roleService: RoleService,
              private toastr: ToastrService,
              // vcr: ViewContainerRef,
              private authenticationService: AuthenticationService,
              private cookieService: CookieManagerService,
              private router: Router) {
    this.user = new UserEditViewModel(0, '', '', '', '', '', []);
    // this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.loadDataForView();
  }

  private loadDataForView() {

    const userId = this.route.params['value'].id;
    this.subscriptionGetUserById = this.userService.getUserById(userId).subscribe((userToEdit: any) => {
      console.log('userToEdit');
      console.log(userToEdit);
      this.subscriptionGetAllRoles = this.roleService.getAllRoles().subscribe((rolesData: any) => {
console.log('....roles...')
console.log(rolesData)
        this.user = new UserEditViewModel(
          userToEdit['data']['id'],
          userToEdit['data']['username'],
          userToEdit['data']['first_name'],
          userToEdit['data']['last_name'],
          userToEdit['data']['email'],
          userToEdit['data']['role'],
          Object.values(rolesData.data)
        );

        this.currentUserRole = {
          id: userToEdit['data']['id'],
          name: userToEdit['data']['role'].toUpperCase()
        };

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
      // this.user['roleId']
      this.currentUserRole.id,
      this.currentUserRole.name,
      this.user['accountLocked']
    );
console.log(updateUser);
    this.subscriptionUpdateUser = this.userService.updateUser(updateUser).subscribe(() => {

      const loggedInUserId = Number(this.cookieService.get('userid'));

      if (this.user['id'] === loggedInUserId && this.currentUserRole.name === 'USER') {

        // this.subscriptionLogoutUser = this.authentication.logout().subscribe(() => {

        //   this.app.setMenuTo(UserType.USER);
        //   this.cookieService.removeLoginData();

        //   this.toastr.success('You have logout successfully.');
        //   setTimeout(() => {
        //     this.router.navigate(['/login']);
        //   }, 900);

        // }, err => {
        //   this.toastr.error(err.error.description);
        // });
        this.authenticationService.logout();

      } else {
        this.toastr.success('Successfully edited.', 'User: ' + this.user['username']);

        setTimeout(() => {

          this.router.navigate(['admin/users']);
        }, 1000);
      }

    }, (error) => {

    });
  }

  private compareRoles(o1: { id: number, name: string }, o2: { id: number, name: string }): boolean {

    if (o1 && o2 && o1.name === o2.name) {
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
