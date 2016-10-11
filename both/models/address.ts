import ObjectID = Mongo.ObjectID;

export class Address {
  country: string;
  city: string;
  state?: string;
  zip?: string;
  street: string;
}