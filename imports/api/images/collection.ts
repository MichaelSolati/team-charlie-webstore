import { Meteor } from 'meteor/meteor';
import { MongoObservable } from 'meteor-rxjs';
import { UploadFS } from 'meteor/jalik:ufs';

export const Images = new MongoObservable.Collection<any>("images");

function loggedIn(userId) {
  return !!userId;
}

export const ImagesStore = new UploadFS.store.GridFS({
  collection: Images.collection,
  name: 'images',
  filter: new UploadFS.Filter({
    contentTypes: ['image/*']
  }),
  permissions: new UploadFS.StorePermissions({
    insert: loggedIn,
    update: loggedIn,
    remove: loggedIn
  })
});
