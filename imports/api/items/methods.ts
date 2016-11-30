import { Meteor } from "meteor/meteor";
import { Items } from "./collection";

import { Item } from "/imports/app/shared/interfaces/item";

Meteor.methods({
  "items.upsertItem"(item: Item) {
    try {
      if (Roles.userIsInRole(this.userId, 'admin')) {
        const id = item._id;
        delete item._id;
        return Items.upsert(id, {$set: item});
      } else {
        throw new Meteor.Error("MUST BE AN ADMIN");
      }
    } catch (e) {
      throw new Meteor.Error(e.reason);
    }
  },
  "items.remove"(itemId: string) {
    try {
      if (Roles.userIsInRole(this.userId, 'admin')) {
        return Items.remove(itemId);
      } else {
        throw new Meteor.Error("MUST BE AN ADMIN");
      }
    } catch (e) {
      throw new Meteor.Error(e.reason);
    }
  }
});
