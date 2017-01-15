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

  Meteor.publish(
    "company-points",
    (companyId: ObjectID) => PointCollection.find({companyId: companyId}, {})
  );

  Meteor.publish(
    "all-offers",
    () => OfferCollection.find()
  );

  Meteor.publish(
    "points", () => PointCollection.find({})
  );

  Meteor.methods({
    "points.remove" (pointId: ObjectID) {
      PointCollection.remove({_id: pointId});
    },

    "offer.remove" (offerId: ObjectID) {
      OfferCollection.remove({_id: offerId});
    }
  });

  Meteor.publish(
    "offers", () => OfferCollection.find({})
  );

  Meteor.publish(
    "point-offers",
    (pointId: ObjectID) => OfferCollection.find({pointIds: { $in: [ pointId.valueOf()]}}, {})
  );

  /* // Example how to do reactive related publications
  Meteor["publishComposite"] (
    "company-offers",
    (companyId: ObjectID) => {
      return {
        find: () => PointCollection.find({companyId: companyId}, {}),
        children: [{
          find: (point) => OfferCollection.find({pointIds: { $in: [point._id]}}, {})
        }]
      };
    }
  );*/

  Meteor.publish(
    "company-offers", (companyId: ObjectID) => OfferCollection.find({companyId: companyId}, {})
  );

  Meteor.publish(
    "company-atoms", (companyId: ObjectID) => AtomCollection.find({companyId: companyId}, {})
  );
}