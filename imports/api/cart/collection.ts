import { MongoObservable } from 'meteor-rxjs';

export const Cart = new MongoObservable.Collection<any>("cart");
