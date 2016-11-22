import { Component } from "@angular/core";
import template from "./loginPage.component.html";
var baconipsum = require('baconipsum');

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
  private bacon: Array<string> = [];
  /**
  * @method constructor
  */
  constructor () {
    this.bacon.push(baconipsum(15));
    this.bacon.push(baconipsum(15));
    this.bacon.push(baconipsum(15));
  }
}
