import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { ReactiveVar } from "meteor/reactive-var";

import template from "./orders.component.html";

@Component({
  selector: "app-orders",
  template: template
})
export class OrdersComponent implements OnInit, OnDestroy {
  private orders: Array<any> = [];
  private ordersSub: Subscription;
  private searchQuery: Subscription;
  private query: ReactiveVar<string> = new ReactiveVar("");

  constructor () { }

  ngOnInit() {
      // MeteorObservable.autorun().subscribe(() => {
      //   this.ordersSub = MeteorObservable.subscribe("items.search", this.query.get()).subscribe(() => {
      //     MeteorObservable.autorun().subscribe(() => {
      //       this.orders = Orders.find().fetch();
      //     });
      //   });
      // });
  }

  ngOnDestroy() {
    // this.ordersSub.unsubscribe();
  }

  private runSearch(event:any) {
    let value = event.target.value;
    this.query.set(value)
  }
}
