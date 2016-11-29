import { Meteor } from "meteor/meteor";

import { Cart } from "./collection";

if (Meteor.isServer) {
  Meteor.publish("cart.myCart", (user: string) => {
    return Cart.find({user});
  });
}
