import { Meteor } from "meteor/meteor";
import { Items } from "./collection";

import { Item } from "/imports/app/shared/interfaces/item";

Meteor.methods({
  /**
  * Add or save an item.
  * @method items.upsertItem
  * @param {Item} item Item to add/save.
  * @return {String} Id of new chat room.
  * @throws {Error} An error.
  */
  "items.upsertItem"(item: Item) {
    try {
      //if (this.userId) {
      const id = item._id;
      delete item._id;
      return Items.upsert(id, {$set: item});
      //}
      //throw new Meteor.Error("User must be signed in to upsert an item.");
    } catch (e) {
      throw new Meteor.Error(e.reason);
    }
  },
  "items.remove"(itemId: string) {
    try {
      return Items.remove(itemId)
    } catch (e) {
      throw new Meteor.Error(e.reason);
    }
  }
});
