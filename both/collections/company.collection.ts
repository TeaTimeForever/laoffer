import { MongoObservable } from "meteor-rxjs";
import { Company } from "../models/company";

export const CompanyCollection = new MongoObservable.Collection<Company>('companies');