import ObjectID = Mongo.ObjectID;
import { Address } from "./address";

export class Point {
  _id?: ObjectID;
  name: string;
  companyId: ObjectID;
  geoLocation: {lat: number, lng: number};
  address?: Address;
  phone: string;

  constructor() {
    this.companyId = (<any>Meteor.user()).companyId;
  }
}