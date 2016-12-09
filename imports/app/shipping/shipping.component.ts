import { Component, OnInit, OnDestroy } from "@angular/core";
import { Meteor } from "meteor/meteor";
import { UserService } from "/imports/app/shared/services/user.service";
declare var Bert: any;

import template from "./shipping.component.html";

@Component({
  selector: "app-shipping",
  template: template
})
export class ShippingComponent {
  private address :any = {
    "name":"",
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
    for (var prop in this.address) {
      if (this.address[prop].replace(/\s/g,'').length === 0) {
        Bert.alert("Please fill out all shipping details", 'danger', 'growl-top-right');
        return;
      }
    }

    if (this.address.zip.length !== 5) {
      Bert.alert("Invalid zip details, must be 5 characters long", 'danger', 'growl-top-right');
      return;
    }

    Meteor.users.update({"_id" : Meteor.userId()}, {
      $set: {
        "profile.address": this.address
      }
    });
  }
}
