import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Cart } from "/imports/api/cart/collection";

import template from "./cart.component.html";

@Component({
  selector: "app-cart",
  template: template
})
export class CartComponent implements OnInit, OnDestroy {
  private cart: Array<any> = [];
  private cartSub: Subscription;
  constructor () { }

  ngOnInit() {
    MeteorObservable.autorun().subscribe(() => {
      this.cartSub = MeteorObservable.subscribe("cart.myCart").subscribe(() => {
        MeteorObservable.autorun().subscribe(() => {
          this.cart = Cart.find().fetch();
        });
      });
    });
  }

  ngOnDestroy() {
    this.cartSub.unsubscribe();
  }
}
