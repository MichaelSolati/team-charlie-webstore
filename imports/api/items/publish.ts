import { Meteor } from "meteor/meteor";

import { Items } from "./collection";

if (Meteor.isServer) {
    Meteor.publish("items.fireDeals", () => {
        return Items.find({quantity: {$gte: 1}}, { limit: 6 });
    });
    Meteor.publish("items.item", (itemId: string) => {
        return Items.find(itemId);
    });
    Meteor.publish("items.search", (search: string, category: string) => {
      let searchRegEx = { '$regex': '.*' + (search || '') + '.*', '$options': 'i' };
      let query: any = {
        name: searchRegEx,
        quantity: {$gte: 1}
      };

      if (category !== "") {
        query.category = category;
      }
      return Items.find(query, {limit: 60});
    });
    Meteor.publish("items.admin-search", (search: string, category: string) => {
      let searchRegEx = { '$regex': '.*' + (search || '') + '.*', '$options': 'i' };
      let query: any = {
        name: searchRegEx
      };

      if (category !== "") {
        query.category = category;
      }
      return Items.find(query, {limit: 60});
    })
}
