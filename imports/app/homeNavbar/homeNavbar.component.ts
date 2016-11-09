import { Component } from "@angular/core";
import template from "./homeNavbar.component.html";

/**
 * Navbar component for routes in home outlet.
 * @class HomeNavbar
 * @constructor
 */
@Component({
  selector: "home-navbar",
  template: template,
})
export class HomeNavbar {
  private search: string = "Taco";
  /**
  * @method constructor
  */
  constructor () {
    
  }
  newFunction(){
  console.log(this.search);
  }
}
