import { Routes }  from "@angular/router";

import { ActivateGuard } from "/imports/app/shared/services/activate.service";
import { DeactivateGuard } from "/imports/app/shared/services/deactivate.service";

import { HomeOutletComponent } from "./home-outlet.component";
import { HomeComponent } from "/imports/app/home/home.component";
import { SearchComponent } from "/imports/app/search/search.component";
import { AccountComponent } from "/imports/app/account/account.component";
import { LoginPageComponent } from "/imports/app/login-page/login-page.component";
import { HomeNavbarComponent } from "/imports/app/home-navbar/home-navbar.component";
import { ItemPageComponent } from "/imports/app/item-page/item-page.component";
import { LoginFormComponent } from "/imports/app/loginform/loginform.component";
import { ShippingComponent } from "/imports/app/shipping/shipping.component";
import { PaymentComponent } from "/imports/app/paymentmethod/paymentmethod.component";
import { CheckoutComponent } from "/imports/app/checkout/checkout.component";
import { CartComponent } from "/imports/app/cart/cart.component";

export const homeOutletRoutes: Routes = [{
  path: "",
  component: HomeOutletComponent,
  children: [{
    path: "",
    component: HomeComponent
  }, {
    path: "log-in",
    component: LoginPageComponent,
    canActivate: [DeactivateGuard]
  }, {
    path: "item/:itemId",
    component: ItemPageComponent
  }, {
    path: "shipping",
    component: ShippingComponent
  }, {
    path: "payment",
    component: PaymentComponent
  }, {
    path: "search/:item",
    component: SearchComponent
  }, {
    path: "search",
    component: SearchComponent
  }, {
    path: "my-account",
    component: AccountComponent,
    canActivate: [ActivateGuard]
  }, {
    path: "checkout",
    component: CheckoutComponent,
    canActivate: [ActivateGuard]
  }, {
    path: "cart",
    component: CartComponent,
    canActivate: [ActivateGuard]
  }]
}];

export const homeOutletComponents: Array<any> = [
  HomeOutletComponent,
  HomeComponent,
  LoginPageComponent,
  HomeNavbarComponent,
  ItemPageComponent,
  LoginFormComponent,
  ShippingComponent,
  PaymentComponent,
  SearchComponent,
  AccountComponent,
  CheckoutComponent,
  CartComponent
];
