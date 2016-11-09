import ObjectID = Mongo.ObjectID;
import { PointCollection } from "../../../both/collections/point.collection";
import { OfferCollection } from "../../../both/collections/offer.collection";
import { AtomCollection } from "../../../both/collections/atom.collection";

export function publishCollections() {

  Meteor.publish(null, () => {
    return Meteor.users.find({},
      {fields: {
        companyId: 1,
        username: 1,
        name: 1,
        emails: 1
    }});
  });

  Meteor.publish (
    "company-points",
    (companyId: ObjectID) => PointCollection.find({companyId: companyId}, {})
  );

  Meteor.publish (
    "points",
    () => PointCollection.find({})
  );

  Meteor.publish (
    "offers",
    () => OfferCollection.find({})
  );

  Meteor.publish(
    "company-atoms",
    (companyId: ObjectID) => AtomCollection.find({companyId: companyId}, {})
  );


}