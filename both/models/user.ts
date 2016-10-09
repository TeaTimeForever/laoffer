import ObjectID = Mongo.ObjectID;

export interface User {
  _id?: ObjectID,
  name: string;
  companyId: ObjectID;
}