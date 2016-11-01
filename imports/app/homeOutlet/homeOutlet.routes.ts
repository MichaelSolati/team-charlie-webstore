import { Routes }  from "@angular/router";

import { HomeOutlet } from "./homeOutlet.component";
import { Home } from "/imports/app/home/home.component";
import { LoginPage } from "/imports/app/loginPage/loginPage.component";
import { HomeNavbar } from "/imports/app/homeNavbar/homeNavbar.component";

/**
 * Routes for Home parent component.
 * @property homeOutletRoutes
 * @type Routes
 */
export const homeOutletRoutes: Routes = [{
  path: "",
  component: HomeOutlet,
  children: [{
    path: "",
    component: Home
  }, {
    path: "log-in",
    component: LoginPage
  }]
}];

export const homeOutletComponents: Array<any> = [
  HomeOutlet,
  Home,
  LoginPage,
  HomeNavbar
];
