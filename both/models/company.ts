import ObjectID = Mongo.ObjectID;

export interface Company {
  _id: ObjectID,
  name: string;
  registrationNumber: string;
  address: any; // TODO: implement Address class
  phone: string;

}