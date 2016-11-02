import { Meteor } from "meteor/meteor";

import { Items } from "./collection";

if (Meteor.isServer) {
    Meteor.publish("items.fireDeals", () => {
        return Items.find({}, { limit: 6 });
    });
}
