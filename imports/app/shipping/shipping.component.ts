import { Component, OnInit, OnDestroy } from "@angular/core";
import { Meteor } from "meteor/meteor";
import { UserService } from "/imports/app/shared/services/user.service";

import template from "./shipping.component.html";

@Component({
  selector: "app-shipping",
  template: template
})
export class ShippingComponent {
  private address :any = {
    "address":"",
    "city":"",
    "state": "",
    "zip":"",
  }
  constructor (private userService: UserService) { }

  ngOnInit() {
    this.subscription = this.userService.getUser().subscribe((user) => {
      this.user = user;
      if(this.user && this.user.profile.address) {
        this.address = this.user.profile.address;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private submit(){
    console.log(this.address)
    Meteor.users.update({"_id" : Meteor.userId()}, {
      $set: {
        "profile.address": this.address
      }
    });
  }
}
