import { Component } from "@angular/core";
import { Meteor } from "meteor/meteor";

import template from "./shipping.component.html";

@Component({
  selector: "app-shipping",
  template: template
})
export class ShippingComponent {
  private address :any = {
    "address1":"",
    "address2":"",
    "city":"",
    "zip":"",
    }
  constructor () {
  }
  submit(){
  console.log(this.address);
  let user = {"_id":Meteor.userId()};
  Meteor.users.update(user, {
    $set : {
      profile: {
        address: this.address
      }
    }
  })
  }
}
