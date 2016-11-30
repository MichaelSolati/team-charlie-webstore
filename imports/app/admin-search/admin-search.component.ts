import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { ReactiveVar } from "meteor/reactive-var";

import { Categories } from "/imports/api/categories/collection";
import { Items } from "/imports/api/items/collection";
import { Item } from "/imports/app/shared/interfaces/item";

import template from "./admin-search.component.html";

@Component({
  selector: "app-admin-search",
  template: template
})
export class AdminSearchComponent implements OnInit, OnDestroy {
  private categories: Array<any> = [];
  private categorySub: Subscription;
  private category: ReactiveVar<string> = new ReactiveVar("");
  private itemsSub: Subscription;
  private priceSort: ReactiveVar<string> = new ReactiveVar(null);
  private search: Array<Item> = [];
  private searchQuery: Subscription;
  private quantitySort: ReactiveVar<string> = new ReactiveVar(null);
  private query: ReactiveVar<string> = new ReactiveVar("");

  constructor () { }

  ngOnInit() {
    MeteorObservable.autorun().subscribe(() => {
      this.itemsSub = MeteorObservable.subscribe("items.admin-search", this.query.get(), this.category.get()).subscribe(() => {
        MeteorObservable.autorun().subscribe(() => {
          if (this.priceSort.get() && this.quantitySort.get()) {
            this.search = Items.find({}, {sort: {quantity: this.quantitySort.get(), price: this.priceSort.get()}}).fetch();
          } else if (this.quantitySort.get()) {
            this.search = Items.find({}, {sort: {quantity: this.quantitySort.get()}}).fetch();
          } else if (this.priceSort.get()) {
            this.search = Items.find({}, {sort: {price: this.priceSort.get()}}).fetch();
          } else {
            this.search = Items.find({}).fetch();
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
    this.itemsSub.unsubscribe();
    this.categorySub.unsubscribe();
  }

  private setCategory(category: string) {
    this.category.set(category)
  }

  private sortPrices() {
    let sort = this.priceSort.get();
    if (sort === null) {
      this.priceSort.set(-1);
    } else if (sort === -1) {
      this.priceSort.set(1);
    } else {
      this.priceSort.set(null);
    }
  }

  private sortQuantities() {
    let sort = this.quantitySort.get();
    if (sort === null) {
      this.quantitySort.set(-1);
    } else if (sort === -1) {
      this.quantitySort.set(1);
    } else {
      this.quantitySort.set(null);
    }
  }

  private runSearch(query: string) {
    this.query.set(query)
  }
}
