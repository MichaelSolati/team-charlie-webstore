import { Meteor } from "meteor/meteor";
import { Categories } from "./collection";
import { Items } from "/imports/api/items/collection";

Meteor.methods({
  "categories.add"(category: string) {
    try {
      if (Roles.userIsInRole(this.userId, 'admin')) {
        if (Categories.findOne({name: category.toUpperCase()})) {
          throw new Meteor.Error("Category Exists");
        }
        return Categories.insert({name: category.toUpperCase()});
      } else {
        throw new Meteor.Error("MUST BE AN ADMIN");
      }
    } catch (e) {
      throw new Meteor.Error(e.reason);
    }
  },
  "categories.remove"(categoryId: string) {
    try {
      if (Roles.userIsInRole(this.userId, 'admin')) {
        let category = Categories.findOne({_id: categoryId});
        if (category) {
          Items.update({category: categoryId}, {$set: {category: null}}, {multi: true});
          return Categories.remove(categoryId);
        }
      } else {
        throw new Meteor.Error("MUST BE AN ADMIN");
      }
    } catch (e) {
      throw new Meteor.Error(e.reason);
    }
  }
});
