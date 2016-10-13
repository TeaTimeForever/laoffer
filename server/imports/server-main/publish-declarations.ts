import ObjectID = Mongo.ObjectID;
import { PointCollection } from "../../../both/collections/point.collection";
export function publishCollections() {

  Meteor.publish("company-points", (companyId: ObjectID) => {
    return PointCollection.find(
      {companyId: companyId}, {}
    );
  });


  Meteor.publish("user", (_id: ObjectID) => {
    return Meteor.users.find({
      _id: _id
    }, {fields: {
        companyId: 1,
        username: 1,
        name: 1,
        emails: 1
    }});
  });


}