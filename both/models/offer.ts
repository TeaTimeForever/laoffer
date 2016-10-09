import ObjectID = Mongo.ObjectID;
import { Atom } from "./atom";
import { Category } from "./category.type";

export interface Offer {
  _id?: ObjectID;
  pointId: ObjectID;
  whenActive: string;
  price: number;
  molecule: Array<Atom|Category>;
}