import ObjectID = Mongo.ObjectID;
import { Address } from "./address";

export interface Point {
  _id?: ObjectID,
  companyId: ObjectID,
  geoLocation: string;
  address?: Address; // TODO: implement Address class
  phone: string;
}