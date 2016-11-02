import { Component } from "@angular/core";

/**
 * Parent route/component for Admin subroutes.
 * @class AdminOutlet
 * @constructor
 */
@Component({
  selector: "admin-outlet",
  template: `
  <app-admin-navbar></app-admin-navbar>
  <router-outlet></router-outlet>
  `,
})
export class AdminOutlet {
  /**
  * @method constructor
  */
  constructor () {

  }
}
