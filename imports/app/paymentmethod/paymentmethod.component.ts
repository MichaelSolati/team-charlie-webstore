import { Component, OnInit, OnDestroy } from "@angular/core";
import { Meteor } from "meteor/meteor";
import { UserService } from "/imports/app/shared/services/user.service";
var creditCardValidator = require('credit-card-validator')
declare var Bert: any;

import template from "./paymentmethod.component.html";

@Component({
  selector: "app-payment",
  template: template
})
export class PaymentComponent {
  private payment: any = {
    "number" : "",
    "experation" : "",
    "csv" : "",
    "zip" : ""
  };
  constructor (private userService: UserService) { }

  ngOnInit() {
    this.subscription = this.userService.getUser().subscribe((user) => {
      this.user = user;
      if(this.user && this.user.profile.payment) {
        this.payment = this.user.profile.payment;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private submit() {
    let validExperation = (Date.parse(this.payment.experation) > Date.now());
    let validCard = creditCardValidator.validateCardAndSecCode(this.payment.number, this.payment.csv);
    let validZip = (this.payment.zip.length === 5)
    if (validExperation && validCard && validZip) {
      this.payment.type = creditCardValidator.getFaClass(this.payment.number);
      Meteor.users.update({"_id" : Meteor.userId()}, {
        $set: {
          "profile.payment": this.payment
        }
      });
    } else {
      Bert.alert("Invalid Card Details", 'danger', 'growl-top-right');
    }
  }
}
