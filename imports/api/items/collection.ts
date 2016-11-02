import { MongoObservable } from 'meteor-rxjs';

import { Item } from "/imports/app/shared/interfaces/item";

/**
* Creates Items mongo collection
* @module Items
*/
export const Items = new MongoObservable.Collection<Item>("items");
