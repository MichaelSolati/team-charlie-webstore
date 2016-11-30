import { Meteor } from "meteor/meteor";

import { Orders } from "./collection";

if (Meteor.isServer) {
    Meteor.publish("orders.order", (orderId: string) => {
        return Orders.find(orderId);
    });
    Meteor.publish("orders.search", () => {
      //const search = { '$regex': '.*' + (itemName || '') + '.*', '$options': 'i' };
      return Orders.find({}, {limit: 60});
    })
}
