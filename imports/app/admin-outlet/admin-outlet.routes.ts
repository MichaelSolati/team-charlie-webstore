import { Routes }  from "@angular/router";

import { AdminGuard } from "/imports/app/shared/services/admin.service";

import { AdminOutletComponent } from "./admin-outlet.component";
import { AdminSearchComponent } from "/imports/app/admin-search/admin-search.component";
import { AdminNavbarComponent } from "/imports/app/admin-navbar/admin-navbar.component";
import { AdminCategoriesComponent } from "/imports/app/admin-categories/admin-categories.component";
import { AdminItemComponent } from "/imports/app/admin-item/admin-item.component";

export const adminOutletRoutes: Routes = [{
  path: "admin",
  component: AdminOutletComponent,
  canActivate: [AdminGuard],
  children: [{
    path: "",
    component: AdminSearchComponent,
    canActivate: [AdminGuard]
  }, {
    path: "item/:itemId",
    component: AdminItemComponent,
    canActivate: [AdminGuard]
  }, {
    path: "item",
    component: AdminItemComponent,
    canActivate: [AdminGuard]
  }, {
    path: "categories",
    component: AdminCategoriesComponent,
    canActivate: [AdminGuard]
  }]
}];

export const adminOutletComponents: Array<any> = [
  AdminOutletComponent,
  AdminNavbarComponent,
  AdminItemComponent,
  AdminSearchComponent,
  AdminCategoriesComponent
];
