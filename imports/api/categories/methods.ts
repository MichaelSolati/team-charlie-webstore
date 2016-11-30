import { Meteor } from "meteor/meteor";
import { Categories } from "./collection";
import { Items } from "/imports/api/items/collection";

Meteor.methods({
  "categories.add"(category: string) {
    try {
      return Categories.insert(category);
    } catch (e) {
      throw new Meteor.Error(e.reason);
    }
  },
  "categories.remove"(categoryId: string) {
    try {
      let category = Categories.findOne({_id: categoryId});
      if (category) {
        Items.update({category: categoryId}, {$set: {category: null}}, {multi: true});
        return Categories.remove(categoryId);
      }
    } catch (e) {
      throw new Meteor.Error(e.reason);
    }
  }
});
