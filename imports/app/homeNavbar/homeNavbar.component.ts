import { Component } from "@angular/core";
import { Router } from "@angular/router";
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
  private search: string = "";
  /**
  * @method constructor
  */
  constructor (private router: Router) {

  }
  private searchItems(): void{
    let search = encodeURI(this.search);
    this.router.navigate(['search', search]);
  }
}
