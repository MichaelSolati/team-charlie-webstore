import { Routes }  from "@angular/router";

import { HomeOutlet } from "./homeOutlet.component";
import { Home } from "/imports/app/home/home.component";
import { LoginPage } from "/imports/app/loginPage/loginPage.component";

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
