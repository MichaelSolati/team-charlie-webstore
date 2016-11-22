import { Component, OnInit, OnDestroy } from "@angular/core";
import { Meteor } from "meteor/meteor";
import { UserService } from "/imports/app/shared/services/user.service";

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
    Meteor.users.update({"_id" : Meteor.userId()}, {
      $set: {
        "profile.payment": this.payment
      }
    });
  }
}
