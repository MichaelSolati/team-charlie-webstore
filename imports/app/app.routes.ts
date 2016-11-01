import { Routes, RouterModule } from "@angular/router";

import { homeOutletRoutes, homeOutletComponents } from "/imports/app/homeOutlet/homeOutlet.routes";
import { adminOutletRoutes, adminOutletComponents } from "/imports/app/adminOutlet/adminOutlet.routes";

/**
 * Routes for App.
 * @property appRoutes
 * @type Routes
 */
const appRoutes: Routes = [
  ...homeOutletRoutes,
  ...adminOutletRoutes
];

export const appRouting = RouterModule.forRoot(appRoutes);

export const appComponents: Array<any> = [
  ...homeOutletComponents,
  ...adminOutletComponents
];
