import { Component } from "@angular/core";
import template from "./paymentmethod.component.html";


@Component({
  selector: "app-payment",
  template: template
})
export class PaymentComponent {
  constructor () {

    export const adminOutletRoutes: Routes = [{
      path: "payment",
      component: paymentmethod,
      children: [{
        path: "",
        component: AdminHome
      }]
    }];
  }
}
