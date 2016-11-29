import { Meteor } from "meteor/meteor";
import { Cart } from "./collection";

import { Item } from "/imports/app/shared/interfaces/item";

Meteor.methods({
  "cart.add"(item: Item) {
    try {
      let existing = Cart.findOne({user: this.userId, item: item.item});
      if (existing) {
        let id = existing._id;
        delete existing._id;

        existing.quantity++;

        return Cart.upsert({_id: id}, {$set: existing});
      } else {
        item.item = item._id;
        item.user = this.userId;
        item.quantity = 1;

        delete item._id;

        return Cart.insert(item);
      }
    } catch (e) {
      throw new Meteor.Error(e.reason);
    }
  },
  "cart.remove"(itemId: string) {
    try {
      let existing = Cart.findOne({_id: itemId});
      if (existing.quantity > 1) {
        let id = existing._id;
        delete existing._id;

        existing.quantity--;

        return Cart.upsert({_id: id}, {$set: existing});
      } else {
        return Cart.remove(itemId);
      }

    } catch (e) {
      throw new Meteor.Error(e.reason);
    }
  }
});
