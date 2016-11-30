import { Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Categories } from "/imports/api/categories/collection";

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {
  private categorySub: Subscription;

  constructor() {
    MeteorObservable.autorun().subscribe(() => {
      this.categorySub = MeteorObservable.subscribe("categories").subscribe(() => {
        MeteorObservable.autorun().subscribe(() => { });
      });
    });
  }
  transform(categoryId: string): string {
    let category = Categories.findOne({_id:categoryId});
    if (category) {
      return category.name;
    }

    return 'NO CATEGORY';
  }
}
