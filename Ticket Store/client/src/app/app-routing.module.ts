import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';

const routes: Routes = [

  { path: '', redirectTo: 'user/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', loadChildren: '../app/components/user/user.module#UserModule' }, // Lazy loading !
  { path: 'admin', loadChildren: '../app/components/admin/admin.module#AdminModule' }, // Lazy loading !
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
