"use strict";

import { Component } from "@angular/core";
import template from "./loginPage.component.html";

/**
 * Navbar component for routes in home outlet.
 * @class LoginPage
 * @constructor
 */
@Component({
  selector: "log-in",
  template: template,
})
export class LoginPage {
  signInForm: Object = {
  "email":"po@po.po",
  "password":"popopo"
  };
  /**
  * @method constructor
  */
  constructor () {

  }
  signIn () {
  console.log(this.signInForm);
  }
}
