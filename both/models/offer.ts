import ObjectID = Mongo.ObjectID;
import { Molecule } from "./molecule";

export interface Offer {
  _id?: ObjectID;
  pointIds: ObjectID[];
  whenActive: string;
  price: number;
  molecule: Molecule;
}