import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from "meteor/meteor";


import { UserService } from "/imports/app/shared/services/user.service";

import template from "./account.component.html";

@Component({
  selector: "app-account",
  template: template
})
export class AccountComponent implements OnInit, OnDestroy {
  private isAdmin: boolean = false;
  private isAdminSubscription: Subscription;

  constructor (private userService: UserService) { }

  ngOnInit() {
    this.isAdminSubscription = this.userService.getAdminStatus().subscribe((status) => {
      this.isAdmin = status;
    });
  }

  ngOnDestroy() {
    this.isAdminSubscription.unsubscribe();
  }

  private toggleAdminStatus() {
    Meteor.call("admin.toggle", (err, success) => {
      if (err) {
        Bert.alert("Could not change admin status", 'danger', 'growl-top-right');
      } else {
        Bert.alert(success, 'success', 'growl-top-right');
      }
    })
  }
}
