import ObjectID = Mongo.ObjectID;
import { Address } from "./address";

export interface Point {
  _id?: ObjectID;
  name: string;
  companyId: ObjectID;
  geoLocation: {lat: number, lng: number};
  address?: Address;
  phone: string;
}

export namespace Point {
  export function init(companyId?: ObjectID) {
    return {
      name: undefined,
      companyId: companyId,
      geoLocation: {lat: undefined, lng: undefined},
      address: Address.init(),
      phone: undefined
    };
  }
}