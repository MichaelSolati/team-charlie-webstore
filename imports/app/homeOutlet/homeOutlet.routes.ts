import { Routes }  from "@angular/router";

import { HomeOutlet } from "./homeOutlet.component";
import { Home } from "/imports/app/home/home.component";
import { LoginPage } from "/imports/app/loginPage/loginPage.component";
import { HomeNavbar } from "/imports/app/homeNavbar/homeNavbar.component";
import { ItemPageComponent } from "/imports/app/item-page/item-page.component";
import { LoginFormComponent } from "/imports/app/loginform/loginform.component";
import { ShippingComponent } from "/imports/app/shipping/shipping.component";
import { PaymentComponent } from "/imports/app/paymentmethod/paymentmethod.component";

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
  }, {
    path: "item/:itemId",
    component: ItemPageComponent
  }, {
    path: "shipping",
    component: ShippingComponent
  }, {
    path: "payment",
    component: PaymentComponent
  }]
}];

export const homeOutletComponents: Array<any> = [
  HomeOutlet,
  Home,
  LoginPage,
  HomeNavbar,
  ItemPageComponent,
  LoginFormComponent,
  ShippingComponent,
  PaymentComponent
];
