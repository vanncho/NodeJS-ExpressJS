import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/authentication/login/login.component';
import { LogoutComponent } from './components/authentication/logout/logout.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { HomeUserComponent } from './components/user/home-user/home-user.component';

// Guards
import { AuthGuard } from './core/guards/auth/auth.guard';
import { AdminGuard } from './core/guards/admin/admin.guard';

const routes: Routes = [

  {path: 'user/home', component: HomeUserComponent},
  {path: '', redirectTo: 'user/home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'logout', canActivate: [AuthGuard], component: LogoutComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', canActivate: [AuthGuard], loadChildren: '../app/components/admin/admin.module#AdminModule'}, // Lazy loading !
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
