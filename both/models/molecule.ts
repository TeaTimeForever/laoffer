import ObjectID = Mongo.ObjectID;
import { Category } from "./category.type";
import { Atom } from "./atom";

export interface Molecule {
  atoms: Atom[];
  categories: Category[];
}