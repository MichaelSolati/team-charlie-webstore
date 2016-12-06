import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from "meteor/meteor";
import { MeteorObservable } from 'meteor-rxjs';
declare var Bert: any;

import { Cart } from "/imports/api/cart/collection";

import template from "./cart.component.html";

@Component({
  selector: "app-cart",
  template: template
})
export class CartComponent implements OnInit, OnDestroy {
  private cart: Array<any> = [];
  private cartSub: Subscription;
  private total: number = 0;
  constructor () { }

  ngOnInit() {
    MeteorObservable.autorun().subscribe(() => {
      let user = Meteor.userId();
      this.cartSub = MeteorObservable.subscribe("cart.myCart", user).subscribe(() => {
        MeteorObservable.autorun().subscribe(() => {
          this.cart = Cart.find().fetch();
          this.total = 0;
          for(let i = 0; i < this.cart.length; i++){
            this.total += (this.cart[i].price * this.cart[i].quantity);
          }
        });
      });
    });
  }

  ngOnDestroy() {
    this.cartSub.unsubscribe();
  }

  private add(item: any) {
    Meteor.call("cart.add", item, (err, success) => {
      if (err) {
        Bert.alert(err.message, 'danger', 'growl-top-right');
      } else {
        Bert.alert("One added to cart", 'success', 'growl-top-right');
      }
    });
  }

  private remove(itemId: string) {
    Meteor.call("cart.remove", itemId, (err, success) => {
      if (err) {
        Bert.alert(err.message, 'danger', 'growl-top-right');
      } else {
        Bert.alert("One removed from cart", 'success', 'growl-top-right');
      }
    });
  }
}
