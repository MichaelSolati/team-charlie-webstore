import { Meteor } from "meteor/meteor";
import { Orders } from "./collection";

Meteor.methods({
  "orders.add"(order: any) {
    try {
      return Orders.insert(order);
    } catch (e) {
      throw new Meteor.Error(e.message);
    }
  }
});
