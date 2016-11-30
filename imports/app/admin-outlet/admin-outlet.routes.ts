import { Routes }  from "@angular/router";

import { AdminOutletComponent } from "./admin-outlet.component";
import { AdminHomeComponent } from "/imports/app/admin-home/admin-home.component";
import { AdminSearchComponent } from "/imports/app/admin-search/admin-search.component";
import { AdminNavbarComponent } from "/imports/app/admin-navbar/admin-navbar.component";
import { AdminCategoriesComponent } from "/imports/app/admin-categories/admin-categories.component";
import { UpsertItemComponent } from "/imports/app/upsert-item/upsert-item.component";

/**
 * Routes for Admin parent component.
 * @property adminOutletRoutes
 * @type Routes
 */
export const adminOutletRoutes: Routes = [{
  path: "admin",
  component: AdminOutletComponent,
  children: [{
    path: "",
    component: AdminHomeComponent
  }, {
    path: "search",
    component: AdminSearchComponent
  }, {
    path: "item/:itemId",
    component: UpsertItemComponent
  }, {
    path: "item",
    component: UpsertItemComponent
  }, {
    path: "categories",
    component: AdminCategoriesComponent
  }]
}];

export const adminOutletComponents: Array<any> = [
  AdminOutletComponent,
  AdminHomeComponent,
  AdminNavbarComponent,
  UpsertItemComponent,
  AdminSearchComponent,
  AdminCategoriesComponent
];
