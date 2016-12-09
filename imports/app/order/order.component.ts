import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Orders } from "/imports/api/orders/collection";

import template from "./order.component.html";

@Component({
  selector: "app-order",
  template: template
})
export class OrderComponent implements OnInit, OnDestroy {
  private order: any;
  private orderIdSub: Subscription;
  private orderSub: Subscription;

  constructor (private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.orderIdSub = this.route.params.subscribe((params) => {
      let orderId = params.orderId;
      this.orderSub = MeteorObservable.subscribe("orders.order", orderId).subscribe(() => {
        MeteorObservable.autorun().subscribe(() => {
          if (Orders.findOne({})) {
            this.order = Orders.findOne({});
          }
        });
      });
    });
  }

  ngOnDestroy() {
    this.orderIdSub.unsubscribe();
    this.orderSub.unsubscribe();
  }
}
