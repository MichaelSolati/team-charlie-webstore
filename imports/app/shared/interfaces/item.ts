export class Item {
  constructor(
    public name?: string,
    public price?: number,
    public description?: string,
    public quantity?: number,
    public addedOn?: Date,
    public _id?: string
  ) {
    if (!addedOn) {
      this.addedOn = new Date();
    }
  }
}
