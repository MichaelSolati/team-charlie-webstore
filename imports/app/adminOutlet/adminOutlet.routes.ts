import { Routes }  from "@angular/router";

import { AdminOutlet } from "./adminOutlet.component";
import { AdminHome } from "/imports/app/adminHome/adminHome.component";

/**
 * Routes for Admin parent component.
 * @property adminOutletRoutes
 * @type Routes
 */
export const adminOutletRoutes: Routes = [{
  path: "admin",
  component: AdminOutlet,
  children: [{
    path: "",
    component: AdminHome
  }]
}];
