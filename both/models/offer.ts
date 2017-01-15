import ObjectID = Mongo.ObjectID;
import { Molecule } from "./molecule";

export interface Offer {
  _id?: ObjectID;
  pointIds: ObjectID[];
  companyId: ObjectID;
  name: string;
  whenActive: string;
  price: number;
  molecule: Molecule;
}

export namespace Offer {
  export function init(companyId?: ObjectID) {
    return {
      pointIds: [],
      companyId: companyId,
      name: undefined,
      whenActive: undefined,
      price: undefined,
      molecule: {
        atoms: [],
        categories: []
      }
    };
  }
}