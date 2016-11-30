import { MongoObservable } from 'meteor-rxjs';

export const Categories = new MongoObservable.Collection<any>("categories");
