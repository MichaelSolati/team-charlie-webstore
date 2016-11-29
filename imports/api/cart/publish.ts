import { Meteor } from "meteor/meteor";

import { Cart } from "./collection";

if (Meteor.isServer) {
    Meteor.publish("cart.myCart", () => {
        return Cart.find({user: this.userId});
    });
}
