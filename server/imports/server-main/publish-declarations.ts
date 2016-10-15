import ObjectID = Mongo.ObjectID;
import { PointCollection } from "../../../both/collections/point.collection";
export function publishCollections() {

  Meteor.publish(
    "company-points",
    (companyId: ObjectID) => PointCollection.find({companyId: companyId}, {})
  );

  Meteor.publish(null, () => {
    return Meteor.users.find({},
      {fields: {
        companyId: 1,
        username: 1,
        name: 1,
        emails: 1
    }});
  });
}