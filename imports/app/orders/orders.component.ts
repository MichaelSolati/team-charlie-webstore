import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { ReactiveVar } from "meteor/reactive-var";

import { Orders } from "/imports/api/orders/collection";

import template from "./orders.component.html";

@Component({
  selector: "app-orders",
  template: template
})
export class OrdersComponent implements OnInit, OnDestroy {
  private orders: Array<any> = [];
  private ordersSub: Subscription;
  private days: ReactiveVar<number> = new ReactiveVar(365);

  constructor () { }

  ngOnInit() {
      MeteorObservable.autorun().subscribe(() => {
        this.ordersSub = MeteorObservable.subscribe("orders.all", this.days.get(), Meteor.userId()).subscribe(() => {
          MeteorObservable.autorun().subscribe(() => {
            this.orders = Orders.find({}, { sort: { "orderDate": -1 } }).fetch();
          });
        });
      });
  }

  ngOnDestroy() {
    this.ordersSub.unsubscribe();
  }

  private setDate(event:any) {
    let value = event.target.value;
    this.days.set(value)
  }
}
