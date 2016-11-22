import { Routes }  from "@angular/router";

import { AdminOutlet } from "./adminOutlet.component";
import { AdminHome } from "/imports/app/adminHome/adminHome.component";
import { AdminSearchComponent } from "/imports/app/admin-search/admin-search.component";
import { AdminNavbarComponent } from "/imports/app/admin-navbar/admin-navbar.component";
import { UpsertItemComponent } from "/imports/app/upsert-item/upsert-item.component";

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
  }, {
    path: "search",
    component: AdminSearchComponent
  }, {
    path: "item/:itemId",
    component: UpsertItemComponent
  }, {
    path: "item",
    component: UpsertItemComponent
  }]
}];

export const adminOutletComponents: Array<any> = [
  AdminOutlet,
  AdminHome,
  AdminNavbarComponent,
  UpsertItemComponent,
  AdminSearchComponent
];
