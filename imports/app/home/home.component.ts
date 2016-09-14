"use strict";

import { Component } from "@angular/core";
import template from "./home.component.html";

/**
 * Component for Index page.
 * @class Home
 * @constructor
 */
@Component({
  selector: "home",
  template: template,
})
export class Home {
deals: Array<Object> = [{
"itemName":"Donuts",
"price":"$3.99"
}, {
"itemName":"Bagels",
"price":"$1.99"
}, {
"itemName":"Coffee",
"price":"$0.99"
}];
  /**
  * @method constructor
  */
  constructor () {

  }
}
