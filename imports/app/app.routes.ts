import { Routes, RouterModule } from "@angular/router";

import { homeOutletRoutes, homeOutletComponents } from "/imports/app/home-outlet/home-outlet.routes";
import { adminOutletRoutes, adminOutletComponents } from "/imports/app/admin-outlet/admin-outlet.routes";

const appRoutes: Routes = [
  ...homeOutletRoutes,
  ...adminOutletRoutes
];

export const appRouting = RouterModule.forRoot(appRoutes);

export const appComponents: Array<any> = [
  ...homeOutletComponents,
  ...adminOutletComponents
];
