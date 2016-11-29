import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserService } from "/imports/app/shared/services/user.service";
import { Subscription } from 'rxjs/Subscription';

import template from "./account.component.html";

@Component({
  selector: "app-account",
  template: template
})
export class AccountComponent implements OnInit, OnDestroy {
  private user: any;
  private userSub: Subscription;

  constructor (private userService: UserService) { }

  ngOnInit() {
    this.userSub = this.userService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
