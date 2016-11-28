import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Items } from "/imports/api/items/collection";
import { Item } from "/imports/app/shared/interfaces/item";

import template from "./home.component.html";

@Component({
  selector: "home",
  template: template
})
export class HomeComponent implements OnInit, OnDestroy {
  private items = [];
  private itemsSub: Subscription;

  constructor () { }

  ngOnInit() {
    this.itemsSub = MeteorObservable.subscribe('items.fireDeals').subscribe(() => {
      MeteorObservable.autorun().subscribe(() => {
        this.items = Items.find({}).fetch();
      });
    });
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
  }
}
