import { Meteor } from "meteor/meteor";

import { Items } from "./collection";

if (Meteor.isServer) {
    Meteor.publish("items.fireDeals", () => {
        return Items.find({}, { limit: 6 });
    });
    Meteor.publish("items.item", (itemId: string) => {
        return Items.find(itemId);
    });
}
