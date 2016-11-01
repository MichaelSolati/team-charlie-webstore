import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from '@angular/router';

import { routing } from "./app.routes";

import { AppComponent } from "./app.component";
import { AdminHome } from "/imports/app/adminHome/adminHome.component";
import { AdminOutlet } from "/imports/app/adminOutlet/adminOutlet.component";
import { Home } from "/imports/app/home/home.component";
import { HomeNavbar } from "/imports/app/homeNavbar/homeNavbar.component";
import { HomeOutlet } from "/imports/app/homeOutlet/homeOutlet.component";
import { LoginPage } from "/imports/app/loginPage/loginPage.component";

/**
* Declares an NgModule. Declares all dependencies as well as which component to bootstrap.
* @class AppModule
*/
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    AdminHome,
    AdminOutlet,
    Home,
    HomeNavbar,
    HomeOutlet,
    LoginPage
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
