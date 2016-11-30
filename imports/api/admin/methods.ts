import { Meteor } from "meteor/meteor";

Meteor.methods({
  "admin.toggle"() {
    try {
      if (Roles.userIsInRole(this.userId, 'admin')) {
        Roles.removeUsersFromRoles(this.userId, "admin");
        return "You are no longer an admin!";
      } else {
        Roles.addUsersToRoles(this.userId, "admin");
        return "You are now an admin!";
      }
    } catch (e) {
      throw new Meteor.Error(e.reason);
    }
  }
});
