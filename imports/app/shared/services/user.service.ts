import { Injectable } from "@angular/core";
import { Meteor } from "meteor/meteor";
import { MeteorComponent } from "angular2-meteor";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class UserService extends MeteorComponent {
  private isAdmin: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  private user: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor() {
    super();
    this.isAdmin.next(false);
    this.user.next(false);
    this.autorun(() => {
      if (Meteor.user()) {
        this.user.next(Meteor.user());
        this.isAdmin.next(Roles.userIsInRole(Meteor.userId(), 'admin'));
      } else {
        this.user.next(false);
        this.isAdmin.next(Roles.userIsInRole(Meteor.userId(), 'admin'));
      }
    });
  }

  public getAdminStatus() {
    return this.isAdmin;
  }

  public getUser() {
    return this.user;
  }
}
