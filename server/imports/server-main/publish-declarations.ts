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
    "points", () => PointCollection.find({})
  );

  Meteor.methods({
    "points.remove" (pointId: ObjectID) {
      PointCollection.remove({_id: pointId});
    }
  });

  Meteor.publish(
    "offers", () => OfferCollection.find({})
  );

  Meteor.publish(
    "point-offers",
    (pointId: ObjectID) => OfferCollection.find({pointIds: { $in: [ pointId.valueOf()]}}, {})
  );

  Meteor["publishComposite"] (
    "company-offers2",
    (companyId: ObjectID) => {
      return {
        find: () => PointCollection.find({companyId: companyId}, {}),
        children: [{
          find(point) {
            console.log("POINT", point);
            return OfferCollection.find({pointIds: { $in: [point._id]}}, {});
          }
        }]
      };
    }
  );

  Meteor.publish(
    "company-offers",
    (companyId: ObjectID) => {

      let pointIds: ObjectID[] = PointCollection.find({companyId: companyId}, {}).cursor.map(p => p._id);
      return OfferCollection.find({pointIds: { $in: pointIds}}, {});
    }
  );

  Meteor.publish(
    "company-atoms", (companyId: ObjectID) => AtomCollection.find({companyId: companyId}, {})
  );
}