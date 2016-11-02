import { Component } from "@angular/core";
import { Meteor } from "meteor/meteor";

import template from "./upsert-item.component.html";

import { Item } from "/imports/app/shared/interfaces/item";

/**
 * Component to add or update an item.
 * @class UpsertItemComponent
 * @constructor
 */
@Component({
  selector: "app-upsert-item",
  template: template
})
export class UpsertItemComponent {
  private item: Item;
  /**
  * @method constructor
  */
  constructor () {
    this.item = new Item(null,null,null,null);
  }
  /**
  * Saves item into Items collection.
  * @method saveItem
  */
  private saveItem(): void {
    Meteor.call("items.upsertItem", this.item, (err, success) => {
      if (err) {
        Bert.alert( "Could not save item... ☹️", 'danger', 'growl-top-right' );
      } else {
        Bert.alert( "Item Saved!!! 😊", 'success', 'growl-top-right' );
      }
    });
  }
}
