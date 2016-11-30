declare var require: any;

var baconipsum = require('baconipsum');
var vgng = require('video-game-name-generator');

import "/imports/api/admin/index.ts";
import "/imports/api/cart/index.ts";
import "/imports/api/categories/index.ts";
import "/imports/api/items/index.ts";
import "/imports/api/orders/index.ts";

import { Categories } from "/imports/api/categories/collection";
import { Items } from "/imports/api/items/collection";
import { Item } from "/imports/app/shared/interfaces/item";


Meteor.startup(()=>{
  function dummyProduct(category: number) {
    let categories = ["ACTION", "RPG", "MUSIC", "FPS", "THE POPE", "RACING", "SPORTS"];
    return new Item(vgng.random(), Math.round(Math.random()*10000)/100, baconipsum(Math.floor(Math.random()*49)+1), Math.floor(Math.random()*99)+1, new Date(), Categories.findOne({name: categories[category]})._id);
  }

  if(!Categories.findOne()) {
    let categories = ["ACTION", "RPG", "MUSIC", "FPS", "THE POPE", "RACING", "SPORTS"];
    for (let i = 0; i < categories.length; i++) {
      Categories.insert({name:categories[i]});
    }
  }

  if(!Items.findOne()) {
    let itemsNo = Math.floor(Math.random()*99)+1;
    for (let i = 0; i < itemsNo; i++) {
      let category = Math.floor(Math.random()*7);
      let item = dummyProduct(category);
      delete item._id;

      Items.insert(item);
    }
  }
})
