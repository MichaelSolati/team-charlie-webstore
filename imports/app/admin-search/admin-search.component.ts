import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { ReactiveVar } from "meteor/reactive-var";

import { Items } from "/imports/api/items/collection";
import { Item } from "/imports/app/shared/interfaces/item";

import template from "./admin-search.component.html";

@Component({
  selector: "app-admin-search",
  template: template
})
export class AdminSearchComponent implements OnInit, OnDestroy {
  private search: Array<Item> = [];
  private itemsSub: Subscription;
  private searchQuery: Subscription;
  private query: ReactiveVar<string> = new ReactiveVar("");

  constructor () { }

  ngOnInit() {
      MeteorObservable.autorun().subscribe(() => {
        this.itemsSub = MeteorObservable.subscribe("items.search", this.query.get()).subscribe(() => {
          MeteorObservable.autorun().subscribe(() => {
            this.search = Items.find().fetch();
          });
        });
      });
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
  }

  private runSearch(event:any) {
    let value = event.target.value;
    this.query.set(value)
  }
}
