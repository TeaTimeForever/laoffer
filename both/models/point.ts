import ObjectID = Mongo.ObjectID;
import { Address } from "./address";

export class Point {
  _id?: ObjectID;
  companyId: ObjectID;
  geoLocation: string;
  address?: Address;
  phone: string;

  constructor() {
    this.companyId = (<any>Meteor.user()).companyId;
  }
}