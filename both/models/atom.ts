import ObjectID = Mongo.ObjectID;
import { Category } from "./category.type";

export class Atom {
  _id?: ObjectID;
  companyId: ObjectID;
  price: number;
  tags: string[];
  category: Category;
  name: string;
  description: string;

  constructor(companyId?: ObjectID) {
    this.companyId = companyId;
  }
}