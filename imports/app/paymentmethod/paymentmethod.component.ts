import { Component } from "@angular/core";
import {Meteor} from "meteor/meteor";
import template from "./paymentmethod.component.html";

@Component({
  selector: "app-payment",
  template: template
})
export class PaymentComponent {
  private payment: any = {
    "ccnumber" : "",
    "month" : "",
    "year" : "",
    "csv" : "",
    "zip" : ""
  };
  constructor () {
    console.log(this.payment);
    Meteor.users.update({"_id" : Meteor.userId()}, {
      $set: {
        profile: {
          creditcard: this.payment
      }
    }
    });
  }
  submit() {
    console.log(this.payment);
  }
}
