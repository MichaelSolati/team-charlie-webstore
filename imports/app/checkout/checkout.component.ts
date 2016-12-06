import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { Meteor } from "meteor/meteor";
import { Router } from "@angular/router";
declare var Bert: any;

import { UserService } from "/imports/app/shared/services/user.service";

import { Cart } from "/imports/api/cart/collection";

import template from "./checkout.component.html";

@Component({
  selector: "app-checkout",
  template: template
})
export class CheckoutComponent implements OnInit, OnDestroy {
  private cart: Array<any> = [];
  private cartSubscription: Subscription;
  private processing: boolean = false;
  private shippingMethod: any = {option:'7 day',price:0.00};
  private total: number = 0;
  private user: any;
  private userSubscription: Subscription;
  constructor (private router: Router, private userService: UserService) { }

  ngOnInit() {
    MeteorObservable.autorun().subscribe(() => {
      let user = Meteor.userId();
      this.cartSubscription = MeteorObservable.subscribe("cart.myCart", user).subscribe(() => {
        MeteorObservable.autorun().subscribe(() => {
          this.cart = Cart.find().fetch();
          this.total = 0;
          for(let i = 0; i < this.cart.length; i++){
            this.total += (this.cart[i].price * this.cart[i].quantity);
          }
        });
      });
    });

    this.userSubscription = this.userService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  private order() {
    this.processing = true;
    let order = {
      items: this.cart,
      total: this.total,
      orderDate: new Date(),
      shippingMethod: this.shippingMethod,
      buyer: this.user._id
    }

    if(this.cart.length === 0) {
      Bert.alert("Your cart is empty!", "danger", "growl-top-right");
      this.processing = false;
      return;
    }

    if(this.user && this.user.profile && this.user.profile.payment) {
      order.payment = this.user.profile.payment
    } else {
      Bert.alert("Please add a valid payment method!", "danger", "growl-top-right");
      this.processing = false;
      return;
    }

    if(this.user && this.user.profile && this.user.profile.address) {
      order.address = this.user.profile.address
    } else {
      Bert.alert("Please add a valid shipping address!", "danger", "growl-top-right");
      this.processing = false;
      return;
    }

    Meteor.call("orders.add", order, (err, success) => {
      if(err) {
        Bert.alert("Error placing order...", "danger", "growl-top-right");
      } else {
        Meteor.call("cart.empty");
        this.router.navigate(['/', 'my-account']);
      }
    });
    this.processing = false;
  }
}
