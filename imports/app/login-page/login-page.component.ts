import { Component } from "@angular/core";
import template from "./login-page.component.html";
var baconipsum = require('baconipsum');

@Component({
  selector: "app-login-page",
  template: template,
})
export class LoginPageComponent {
  private bacon: Array<string> = [];
  
  constructor () {
    this.bacon.push(baconipsum(15));
    this.bacon.push(baconipsum(15));
    this.bacon.push(baconipsum(15));
  }
}
