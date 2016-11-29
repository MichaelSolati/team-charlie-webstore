import { MongoObservable } from 'meteor-rxjs';

/**
* Creates Items mongo collection
* @module Items
*/
export const Cart = new MongoObservable.Collection<any>("cart");
