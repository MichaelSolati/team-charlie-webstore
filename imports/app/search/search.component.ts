import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { ReactiveVar } from "meteor/reactive-var";

import { Categories } from "/imports/api/categories/collection";
import { Items } from "/imports/api/items/collection";
import { Item } from "/imports/app/shared/interfaces/item";

import template from "./search.component.html";

@Component({
  selector: "app-search",
  template: template
})
export class SearchComponent implements OnInit, OnDestroy {
  private categories: Array<any> = [];
  private categorySub: Subscription;
  private category: ReactiveVar<string> = new ReactiveVar("");
  private itemsSub: Subscription;
  private priceSort: ReactiveVar<string> = new ReactiveVar(null);
  private search: Array<Item> = [];
  private searchQuery: Subscription;
  private query: ReactiveVar<string> = new ReactiveVar("");

  constructor (private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.searchQuery = this.route.params.subscribe((params) => {
      if (params.item) {
        this.query.set(decodeURI(params.item));
      } else {
        this.query.set("");
      }
      MeteorObservable.autorun().subscribe(() => {
        this.itemsSub = MeteorObservable.subscribe("items.search", this.query.get(), this.category.get()).subscribe(() => {
          MeteorObservable.autorun().subscribe(() => {
            if (this.priceSort.get()) {
              this.search = Items.find({}, {sort: {price: this.priceSort.get()}}).fetch();
            } else {
              this.search = Items.find({}).fetch();
            }
          });
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
    this.searchQuery.unsubscribe();
    this.itemsSub.unsubscribe();
    this.categorySub.unsubscribe();
  }

  private newSearch() {
    let search = encodeURI(this.query.get());
    this.router.navigate(['search', search]);
  }

  private setCategory(category: string) {
    this.category.set(category)
  }

  private sortPrices() {
    let sort = this.priceSort.get();
    if (sort == null) {
      this.priceSort.set(-1);
    } else if (sort == -1) {
      this.priceSort.set(1);
    } else {
      this.priceSort.set(null);
    }
  }

  private runSearch(query: string) {
    this.query.set(query)
  }
}
