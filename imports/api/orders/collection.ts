import { MongoObservable } from 'meteor-rxjs';

export const Orders = new MongoObservable.Collection<any>("orders");
