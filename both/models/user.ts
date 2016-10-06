import { ObjectID } from "meteor/mongo";

export interface User {
  _id: ObjectID,
  name: string;
  companyId: ObjectID;
}