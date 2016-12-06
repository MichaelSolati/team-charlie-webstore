import { Meteor } from "meteor/meteor";
import * as moment from 'moment';

import { Orders } from "./collection";

if (Meteor.isServer) {
    Meteor.publish("orders.order", (orderId: string) => {
        return Orders.find(orderId);
    });
    Meteor.publish("orders.all", (back: number, userId: string) => {
      let date = moment().subtract((back || 365), 'days').calendar();
      return Orders.find({"orderDate": {$gte: new Date(date)}, "buyer": userId});
    })
}
