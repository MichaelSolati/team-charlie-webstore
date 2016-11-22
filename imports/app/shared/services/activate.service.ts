import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Meteor } from "meteor/meteor";

@Injectable()
export class ActivateGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate() {
    if (Meteor.userId()) {
      return true;
    }
    this.router.navigate(["/"]);
    return false;
  }
}
