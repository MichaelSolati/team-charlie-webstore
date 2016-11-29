import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { Meteor } from "meteor/meteor";

import { UserService } from "/imports/app/shared/services/user.service";
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
  private user: any;
  private userSub: Subscription;
  /**
  * @method constructor
  */
  constructor (private route: ActivatedRoute, private router: Router, private userService: UserService) { }
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

    this.userSub = this.userService.getUser().subscribe((user) => {
      this.user = user;
    });
  }
  /**
  * Kills subscriptions on destruction of component
  * @method ngOnInit
  */
  ngOnDestroy() {
    this.itemIdSub.unsubscribe();
    this.itemSub.unsubscribe();
    this.userSub.unsubscribe();
  }

  private addToCart() {
    if(this.user) {
      Meteor.call("cart.add", this.item, (err, success) => {
        if (err) {
          console.log(err);
        } else {
          this.router.navigate(["/", "cart"]);
        }
      });
    } else {
      this.router.navigate(["/", "log-in"]);
    }
  }
}
