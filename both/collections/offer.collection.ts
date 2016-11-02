import { MongoObservable } from "meteor-rxjs";
import { Offer } from "../models/offer";

export const OfferCollection = new MongoObservable.Collection<Offer>('offers');

function loggedIn() {
  return !!Meteor.user();
}

OfferCollection.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});