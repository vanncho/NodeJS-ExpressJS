// Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AuthenticationModule } from './components/authentication/authentication.module';
import { SharedModule } from './components/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';

// Components
import { AppComponent } from './app.component';
// import { LoginComponent } from './components/authentication/login/login.component';
// import { LogoutComponent } from './components/authentication/logout/logout.component';
// import { RegisterComponent } from './components/authentication/register/register.component';
// import { FooterComponent } from './components/shared/footer/footer.component';
// import { HeaderComponent } from './components/shared/header/header.component';
// import { HeaderAdminComponent } from './components/shared/header-admin/header-admin.component';
// import { NotFoundComponent } from './components/shared/not-found/not-found.component';
// import { HomeUserComponent } from './components/user/home-user/home-user.component';

// Services & Guards
// import { AuthGuard } from './core/guards/auth/auth.guard';
// import { AdminGuard } from './core/guards/admin/admin.guard';
import { HttpClientService } from './core/services/http-client.service';
import { CookieManagerService } from './core/services/cookie-manager.service';
import { UserService } from './core/services/user.service';
import { RoleService } from './core/services/role.service';
import { CategoryService } from './core/services/category.service';
import { EventService } from './core/services/event.service';
import { TicketService } from './core/services/ticket.service';
import { HeaderService } from './core/services/header.service';
import { CartService } from './core/services/cart.service';

// Utils
import { AuthenticationUtility } from './core/utils/authentication.util';
import { DateUtility } from './core/utils/date.util';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthenticationModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ToastrModule.forRoot()
  ],
  exports: [RouterModule],
  providers: [
    // AuthGuard,
    // AdminGuard,
    AuthenticationUtility,
    HttpClientService,
    CookieManagerService,
    UserService,
    RoleService,
    CategoryService,
    EventService,
    TicketService,
    HeaderService,
    CartService,
    DateUtility
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
