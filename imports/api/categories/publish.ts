import { Meteor } from "meteor/meteor";

import { Categories } from "./collection";

if (Meteor.isServer) {
    Meteor.publish("categories", (category) => {
        const search = { '$regex': '.*' + (category || '') + '.*', '$options': 'i' };
        return Categories.find({name: search});
    });
}
