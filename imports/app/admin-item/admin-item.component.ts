import { Component, OnInit, OnDestroy } from "@angular/core";
import { Meteor } from "meteor/meteor";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import template from "./admin-item.component.html";

import { Categories } from "/imports/api/categories/collection";
import { Items } from "/imports/api/items/collection";
import { Item } from "/imports/app/shared/interfaces/item";

@Component({
  selector: "app-admin-item",
  template: template
})
export class AdminItemComponent implements OnInit, OnDestroy {
  private categories: Array<any> = [];
  private categorySub: Subscription;
  private item: Item;
  private itemFound: boolean = false;
  private itemId: string;
  private itemIdSub: Subscription;
  private itemSub: Subscription;

  constructor (private route: ActivatedRoute, private router: Router) {
    this.item = new Item(null,null,null,null,null);
  }

  ngOnInit() {
    this.itemIdSub = this.route.params.subscribe((params) => {
      this.itemId = params.itemId;
        this.itemSub = MeteorObservable.subscribe("items.item", this.itemId).subscribe(() => {
          MeteorObservable.autorun().subscribe(() => {
            if (Items.findOne({})) {
            this.item = Items.findOne({});
            this.itemFound = true;
          }
          });
        });
    });

    MeteorObservable.autorun().subscribe(() => {
      this.categorySub = MeteorObservable.subscribe("categories").subscribe(() => {
        MeteorObservable.autorun().subscribe(() => {
          this.categories = Categories.find().fetch();
        });
      });
    });
  }

  ngOnDestroy() {
    this.itemIdSub.unsubscribe();
    this.itemSub.unsubscribe();
    this.categorySub.unsubscribe();
  }

  private removeItem(itemId: string): void {
    Meteor.call("items.remove", itemId, (err, success) => {
      if (err) {
        Bert.alert( "Could not remove item... ☹️", 'danger', 'growl-top-right' );
      } else {
        Bert.alert( "Item Removed!!! 😊", 'success', 'growl-top-right' );
        this.router.navigate(['/admin']);
      }
    });
  }

  private saveItem(): void {
    Meteor.call("items.upsertItem", this.item, (err, success) => {
      if (err) {
        Bert.alert( "Could not save item... ☹️", 'danger', 'growl-top-right' );
      } else {
        Bert.alert( "Item Saved!!! 😊", 'success', 'growl-top-right' );
        this.router.navigate(['/admin']);
      }
    });
  }
}
