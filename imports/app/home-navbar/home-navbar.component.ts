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
  private search: string = "";
  private subscription: Subscription;
  private user: any = null;

  constructor (private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.subscription = this.userService.getUser().subscribe((user) => {
      this.user = user;
      console.log(this.user);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  private searchItems(): void{
    let search = encodeURI(this.search);
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
    })
  }
}
