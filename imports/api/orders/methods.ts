import { Meteor } from "meteor/meteor";
import { Orders } from "./collection";

import { Cart } from "/imports/api/cart/collection";
import { Items } from "/imports/api/items/collection";

Meteor.methods({
  "orders.add"(order: any) {
    try {
      let orderId = Orders.insert(order);
      for (let item of order.items) {
        let origItem = Items.findOne({_id: item.item});
        Items.upsert({_id: origItem._id}, {$set: {"quantity": (origItem.quantity =- item.quantity)}});
      }
      return orderId;
    } catch (e) {
      throw new Meteor.Error(e.message);
    }
  }
});
