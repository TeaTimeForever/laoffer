import ObjectID = Mongo.ObjectID;
import { Category } from "./category.type";

export interface Atom {
  _id?: ObjectID,
  companyId: ObjectID;
  price: number;
  tags: string[],
  category: Category;
  name: string;
  description: string;
}