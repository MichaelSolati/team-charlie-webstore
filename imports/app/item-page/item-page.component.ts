import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { Meteor } from "meteor/meteor";
declare var Bert: any;

import { UserService } from "/imports/app/shared/services/user.service";
import { Cart } from "/imports/api/cart/collection";
import { Items } from "/imports/api/items/collection";
import { Item } from "/imports/app/shared/interfaces/item";

import template from "./item-page.component.html";

@Component({
  selector: "app-item-page",
  template: template
})
export class ItemPageComponent implements OnInit, OnDestroy {
  private cart: Array<any> = [];
  private cartSub: Subscription;
  private item: Item;
  private itemFound: boolean = false;
  private itemId: string;
  private itemIdSub: Subscription;
  private itemSub: Subscription;
  private user: any;
  private userSub: Subscription;

  constructor (private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.itemIdSub = this.route.params.subscribe((params) => {
      this.itemId = params.itemId;
      this.itemSub = MeteorObservable.subscribe("items.item", this.itemId).subscribe(() => {
        MeteorObservable.autorun().subscribe(() => {
          this.item = Items.findOne({});
          if (this.item) {
            this.itemFound = true;
          } else {
            this.itemFound = false;
          }
        });
      });

      MeteorObservable.autorun().subscribe(() => {
        let user = Meteor.userId();
        this.cartSub = MeteorObservable.subscribe("cart.myCart", user).subscribe(() => {
          MeteorObservable.autorun().subscribe(() => {
            this.cart = Cart.find().fetch();
          });
        });
      });
    });

    this.userSub = this.userService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.cartSub.unsubscribe();
    this.itemIdSub.unsubscribe();
    this.itemSub.unsubscribe();
    this.userSub.unsubscribe();
  }

  private addToCart() {
    if(this.user) {
      Meteor.call("cart.add", this.item, (err, success) => {
        if (err) {
          Bert.alert(err.message, 'danger', 'growl-top-right');
        } else {
          Bert.alert("Added to cart", 'success', 'growl-top-right');
          this.router.navigate(["/", "cart"]);
        }
      });
    } else {
      this.router.navigate(["/", "log-in"]);
    }
  }
}
