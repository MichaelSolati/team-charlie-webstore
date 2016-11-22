import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { ReactiveVar } from "meteor/reactive-var";

import { Items } from "/imports/api/items/collection";
import { Item } from "/imports/app/shared/interfaces/item";

import template from "./search.component.html";

/**
* Page to view an item.
* @class ItemPageComponent
* @constructor
*/
@Component({
  selector: "app-search",
  template: template
})
export class SearchComponent implements OnInit, OnDestroy {
  private search: Array<Item> = [];
  private itemsSub: Subscription;
  private searchQuery: Subscription;
  private query: ReactiveVar<string> = new ReactiveVar("");
  /**
  * @method constructor
  */
  constructor (private route: ActivatedRoute, private router: Router) { }
  /**
  * Subscribes to item.
  * @method ngOnInit
  */
  ngOnInit() {
    this.searchQuery = this.route.params.subscribe((params) => {
      this.query.set(decodeURI(params.item));
      MeteorObservable.autorun().subscribe(() => {
        this.itemsSub = MeteorObservable.subscribe("items.search", this.query.get()).subscribe(() => {
          MeteorObservable.autorun().subscribe(() => {
            this.search = Items.find().fetch();
          });
        });
      });
    });
  }
  /**
  * Kills subscriptions on destruction of component
  * @method ngOnInit
  */
  ngOnDestroy() {
    this.searchQuery.unsubscribe();
    this.itemsSub.unsubscribe();
  }

  private newSearch() {
    let search = encodeURI(this.query.get());
    this.router.navigate(['search', search]);
  }

  private runSearch(event:any) {
    let value = event.target.value;
    this.query.set(value)
  }
}
