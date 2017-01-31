import ObjectID = Mongo.ObjectID;
import { Address } from "./address";

export interface Point {
  _id?: ObjectID;
  name: string;
  companyId: ObjectID;
  address?: Address;
  phone: string;
  deleted?: boolean;
}

export namespace Point {
  export function init(companyId?: ObjectID) {
    return {
      name: undefined,
      companyId: companyId,
      address: Address.init(),
      phone: undefined
    };
  }
}