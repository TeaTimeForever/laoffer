import ObjectID = Mongo.ObjectID;
import { Address } from "./address";

export interface Company {
  _id?: ObjectID,
  name: string;
  registrationNumber: string;
  address?: Address; // TODO: implement Address class
  phone: string;

}