import { MongoObservable } from "meteor-rxjs";
import { Point } from "../models/point";

export const PointCollection = new MongoObservable.Collection<Point>('points');

function loggedIn() {
  return !!Meteor.user();
}

PointCollection.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});