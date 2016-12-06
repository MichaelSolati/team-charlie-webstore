import { Component } from "@angular/core";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import { Router } from "@angular/router";
declare var Bert: any;

import template from "./loginform.component.html";

@Component({
  selector: "app-login-form",
  template: template
})
export class LoginFormComponent {
  private signInForm: any = {
    email:"",
    password:"",
    profile: {
      name: ""
    }
  }
  private isSigningIn: boolean = true;
  constructor (private router: Router) { }
  
  private signIn() {
    Meteor.loginWithPassword(this.signInForm.email, this.signInForm.password, (error, success) => {
      if (error) {
        Bert.alert("Could not sign in: "+error.reason, "danger", "growl-top-right");
      } else {
        Bert.alert("Welcome Back!", "success", "growl-top-right");
        this.router.navigate(["my-account"]);
      }
    })
  }

  private signUp() {
    Accounts.createUser(this.signInForm, (error, success) => {
      if (error) {
        Bert.alert("Could not create account: "+error.reason, "danger", "growl-top-right");
      } else {
        Bert.alert("Welcome!", "success", "growl-top-right");
        this.router.navigate(["my-account"]);
      }
    });
  }

  private submit() {
    if (this.isSigningIn) {
      this.signIn();
    } else {
      this.signUp();
    }
  }

  private toggleSignIn() {
    this.isSigningIn = !this.isSigningIn;
  }
}
