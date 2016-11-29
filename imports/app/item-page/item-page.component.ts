import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { Meteor } from "meteor/meteor";

import { Items } from "/imports/api/items/collection";
import { Item } from "/imports/app/shared/interfaces/item";

import template from "./item-page.component.html";

/**
* Page to view an item.
* @class ItemPageComponent
* @constructor
*/
@Component({
  selector: "app-item-page",
  template: template
})
export class ItemPageComponent implements OnInit, OnDestroy {
  private item: Item;
  private itemFound: boolean = false;
  private itemId: string;
  private itemIdSub: Subscription;
  private itemSub: Subscription;
  /**
  * @method constructor
  */
  constructor (private route: ActivatedRoute, private router: Router) { }
  /**
  * Subscribes to item.
  * @method ngOnInit
  */
  ngOnInit() {
    this.itemIdSub = this.route.params.subscribe((params) => {
      this.itemId = params.itemId;
      this.itemSub = MeteorObservable.subscribe("items.item", this.itemId).subscribe(() => {
        MeteorObservable.autorun().subscribe(() => {
          this.item = Items.findOne({});
          if (this.item) {
            this.itemFound = true;
          } else {
            this.itemFound = false;
          }
        });
      });
    });
  }
  /**
  * Kills subscriptions on destruction of component
  * @method ngOnInit
  */
  ngOnDestroy() {
    this.itemIdSub.unsubscribe();
    this.itemSub.unsubscribe();
  }

  private addToCart() {
    Meteor.call("cart.add", this.item, (err, success) => {
      if (err) {
        console.log(err);
      } else {
        this.router.navigate(["/", "cart"]);
      }
    });
  }
}
