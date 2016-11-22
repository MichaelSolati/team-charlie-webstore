import { Meteor } from "meteor/meteor";

import { Items } from "./collection";

if (Meteor.isServer) {
    Meteor.publish("items.fireDeals", () => {
        return Items.find({}, { limit: 6 });
    });
    Meteor.publish("items.item", (itemId: string) => {
        return Items.find(itemId);
    });
    Meteor.publish("items.search", (itemName: string) => {
      const search = { '$regex': '.*' + (itemName || '') + '.*', '$options': 'i' };
      return Items.find({name:search}, {limit: 60});
    })
}
