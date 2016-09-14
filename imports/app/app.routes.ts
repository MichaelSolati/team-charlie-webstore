import { Routes, RouterModule } from "@angular/router";

import { homeOutletRoutes } from "/imports/app/homeOutlet/homeOutlet.routes";
import { adminOutletRoutes } from "/imports/app/adminOutlet/adminOutlet.routes";

/**
 * Routes for App.
 * @property appRoutes
 * @type Routes
 */
const appRoutes: Routes = [
  ...homeOutletRoutes,
  ...adminOutletRoutes
];

export const routing = RouterModule.forRoot(appRoutes);
