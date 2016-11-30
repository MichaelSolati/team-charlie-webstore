import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { ReactiveVar } from "meteor/reactive-var";
import { Meteor } from "meteor/meteor";

import { Categories } from "/imports/api/categories/collection";

import template from "./admin-categories.component.html";

@Component({
  selector: "app-admin-categories",
  template: template
})
export class AdminCategoriesComponent implements OnInit, OnDestroy {
  private categories: Array<any> = [];
  private categorySub: Subscription;
  private searchQuery: Subscription;
  private query: ReactiveVar<string> = new ReactiveVar("");

  constructor () { }

  ngOnInit() {
      MeteorObservable.autorun().subscribe(() => {
        this.categorySub = MeteorObservable.subscribe("categories", this.query.get()).subscribe(() => {
          MeteorObservable.autorun().subscribe(() => {
            this.categories = Categories.find().fetch();
          });
        });
      });
  }

  ngOnDestroy() {
    this.categorySub.unsubscribe();
  }

  private deleteCategory(categoryId: string) {
    Meteor.call("categories.remove", categoryId, (err, success) => {

    })
  }

  private runSearch(event:any) {
    let value = event.target.value;
    this.query.set(value)
  }
}
