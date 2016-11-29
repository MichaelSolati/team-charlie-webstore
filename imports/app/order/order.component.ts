import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import template from "./order.component.html";

@Component({
  selector: "app-order",
  template: template
})
export class OrderComponent implements OnInit, OnDestroy {
  private order: Array<any> = [];
  private orderSub: Subscription;

  constructor () { }

  ngOnInit() {
      // MeteorObservable.autorun().subscribe(() => {
      //   this.orderSub = MeteorObservable.subscribe("orders.one", this.orderId).subscribe(() => {
      //     MeteorObservable.autorun().subscribe(() => {
      //       this.order = Orders.findOne();
      //     });
      //   });
      // });
  }

  ngOnDestroy() {
    // this.orderSub.unsubscribe();
  }
}
