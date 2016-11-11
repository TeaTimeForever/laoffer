import ObjectID = Mongo.ObjectID;
import { Molecule } from "./molecule";

export interface Offer {
  _id?: ObjectID;
  pointId: ObjectID;
  whenActive: string;
  price: number;
  molecule: Molecule;
}