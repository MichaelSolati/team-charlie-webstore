import { Injectable } from "@angular/core";
import { Meteor } from "meteor/meteor";
import { MeteorComponent } from "angular2-meteor";
import { BehaviorSubject } from "rxjs";

/**
* @class UserService
* @constructor
* @extends MeteorComponent
*/
@Injectable()
export class UserService extends MeteorComponent {
  private user: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  /**
  * @method constructor
  */
  constructor() {
    super();
    this.user.next(false);
    this.autorun(() => {
      if (Meteor.user()) {
        this.user.next(Meteor.user());
        // console.log(Meteor.user())
      } else {
        this.user.next(false);
      }
    });
  }

  public getUser() {
    return this.user;
  }
}
