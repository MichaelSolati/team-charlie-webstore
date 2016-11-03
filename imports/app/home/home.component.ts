import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Items } from "/imports/api/items/collection";
import { Item } from "/imports/app/shared/interfaces/item";

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
export class Home implements OnInit, OnDestroy {
  private items = [];
  private itemsSub: Subscription;
  /**
  * @method constructor
  */
  constructor () {

  }
  /**
  * Subscribes to 6 random items.
  * @method ngOnInit
  */
  ngOnInit() {
    this.itemsSub = MeteorObservable.subscribe('items.fireDeals').subscribe(() => {
      MeteorObservable.autorun().subscribe(() => {
        this.items = Items.find({}).fetch();
      });
    });
  }
  /**
  * Kills subscriptions on destruction of component
  * @method ngOnInit
  */
  ngOnDestroy() {
    this.itemsSub.unsubscribe();
  }
}
