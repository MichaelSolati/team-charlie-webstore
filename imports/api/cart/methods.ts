import { Meteor } from "meteor/meteor";
import { Cart } from "./collection";

import { Item } from "/imports/app/shared/interfaces/item";

Meteor.methods({
  "cart.add"(item: Item) {
    try {
      item.item = item._id;
      item.user = this.userId;

      delete item._id;

      return Cart.insert(item);
    } catch (e) {
      throw new Meteor.Error(e.reason);
    }
  },
  "cart.remove"(itemId: string) {
    try {
      return Cart.remove(itemId);
    } catch (e) {
      throw new Meteor.Error(e.reason);
    }
  }
});
