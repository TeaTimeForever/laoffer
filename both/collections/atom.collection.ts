import { MongoObservable } from "meteor-rxjs";
import { Atom } from "../models/atom";

export const AtomCollection = new MongoObservable.Collection<Atom>("atoms");

function loggedIn() {
  return !!Meteor.user();
}

AtomCollection.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});