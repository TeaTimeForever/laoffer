import ObjectID = Mongo.ObjectID;

export interface Address {
  country: string;
  city: string;
  state?: string;
  zip?: string;
  street?: string;
  homeNumber?: string;
  apartmentNumber?: string;
}