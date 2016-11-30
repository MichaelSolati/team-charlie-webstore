import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { UserService } from "/imports/app/shared/services/user.service";

import template from "./home-navbar.component.html";

@Component({
  selector: "app-home-navbar",
  template: template
})
export class HomeNavbarComponent implements OnInit, OnDestroy {
  private isAdmin: boolean = false;
  private isAdminSubscription: Subscription;
  private search: string = "";
  private showDrop: boolean = false;
  private user: any = null;
  private userSubscription: Subscription;

  constructor (private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.isAdminSubscription = this.userService.getAdminStatus().subscribe((status) => {
      this.isAdmin = status;
    });
    this.userSubscription = this.userService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.isAdminSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  private searchItems(): void{
    let search = encodeURI(this.search);
    this.toggleNav();
    this.router.navigate(['search', search]);
  }

  private signOut(): void {
    Meteor.logout((error, success) => {
      if (error) {
        Bert.alert("Could not sign out: "+error.reason, "danger", "growl-top-right");
      } else {
        Bert.alert("Good riddance!", "success", "growl-top-right");
        this.router.navigate(['/']);
      }
    });
  }

  private toggleNav() {
    this.showDrop = !this.showDrop;
  }
}
