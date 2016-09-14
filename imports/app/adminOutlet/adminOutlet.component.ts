"use strict";

import { Component } from "@angular/core";

/**
 * Parent route/component for Admin subroutes.
 * @class AdminOutlet
 * @constructor
 */
@Component({
  selector: "admin-outlet",
  template: `<router-outlet></router-outlet>`,
})
export class AdminOutlet {
  /**
  * @method constructor
  */
  constructor () {

  }
}
