import { Injectable } from "@angular/core";
import { Meteor } from "meteor/meteor";
import { MeteorComponent } from "angular2-meteor";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

/**
* @class UserService
* @constructor
* @extends MeteorComponent
*/
@Injectable()
export class UserService extends MeteorComponent {
  currentUser = new BehaviorSubject<Object>(undefined);
  currentUserId = new BehaviorSubject<String>(undefined);
  /**
  * @method constructor
  */
  constructor() {
    super();
    this.subscribeCurrentUser();
  }
  /**
  * Provides details on currently signed in user.
  * @method subscribeCurrentUser
  */
  subscribeCurrentUser() {
    this.autorun(() => {
      if (Meteor.userId()) {
        this.currentUser.next(Meteor.user());
        this.currentUserId.next(Meteor.userId());
        console.log(Meteor.user())
      } else {
        this.currentUser.next(undefined);
        this.currentUserId.next(undefined);
      }
    });
  }
}
