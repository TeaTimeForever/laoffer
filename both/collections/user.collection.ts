import { MongoObservable } from 'meteor-rxjs';
import { User } from "../models/user";

export const UserCollection = new MongoObservable.Collection<User>('users');