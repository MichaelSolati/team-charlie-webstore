import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Cart } from "/imports/api/cart/collection";

import template from "./checkout.component.html";

@Component({
  selector: "app-checkout",
  template: template
})
export class CheckoutComponent implements OnInit, OnDestroy {
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

  private order() {
    let order = {
      items: this.cart,
      total: this.total,
      orderDate: new Date()
    }

    console.log(order);
  }
}
