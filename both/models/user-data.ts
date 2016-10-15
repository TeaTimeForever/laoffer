import ObjectID = Mongo.ObjectID;

export interface UserData {
  _id?: ObjectID,
  username?: string;
  name?: string;
  companyId?: ObjectID;
  emails?: Email[];
  profile?: any;
}

export interface Email {
  address: string;
  verified: boolean;
}
