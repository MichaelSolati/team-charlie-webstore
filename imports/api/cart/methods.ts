import { Meteor } from "meteor/meteor";
import { Cart } from "./collection";

import { Item } from "/imports/app/shared/interfaces/item";
import { Items } from "/imports/api/items/collection";

Meteor.methods({
  "cart.add"(item: Item) {
    try {
      let itemQuery = item._id;

      if (item.item) {
        itemQuery = item.item;
      }

      let existing = Cart.findOne({user: this.userId, item: itemQuery});

      if (existing) {
        if (existing.quantity < Items.findOne(itemQuery).quantity) {
          let id = existing._id;
          delete existing._id;
          existing.quantity++;

          return Cart.upsert({_id: id}, {$set: existing});
        } else {
          throw new Meteor.Error("Can't Add Anymore To Cart");
        }
      } else {
        item.item = item._id;
        item.user = this.userId;
        item.quantity = 1;

        delete item._id;

        return Cart.insert(item);
      }
    } catch (e) {
      throw new Meteor.Error(e.message);
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
      throw new Meteor.Error(e.message);
    }
  },
  "cart.empty"() {
    try {
      return Cart.remove({"user": this.userId});
    } catch (e) {
      throw new Meteor.Error(e.message);
    }
  }
});
