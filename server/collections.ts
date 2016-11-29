declare var require: any;

var baconipsum = require('baconipsum');
var vgng = require('video-game-name-generator');

import "/imports/api/items/index.ts";
import { Cart } from "/imports/api/cart/collection";
import { Items } from "/imports/api/items/collection";
import { Item } from "/imports/app/shared/interfaces/item";


Meteor.startup(()=>{
  function dummyProduct() {
    return new Item(vgng.random(), Math.round(Math.random()*10000)/100, baconipsum(Math.floor(Math.random()*49)+1), Math.floor(Math.random()*99)+1, new Date());
  }

  if(!Items.findOne()) {
    let itemsNo = Math.floor(Math.random()*99)+1;
    for (let i = 0; i < itemsNo; i++) {

      let item = dummyProduct();
      delete item._id;

      Items.insert(item);
    }
  }
})
