import ObjectID = Mongo.ObjectID;

export interface Address {
  country:   string;
  city:      string;
  state?:    string;
  zip?:      string;
  street:    string;
  latitude:  number;
  longitude: number;
}

export namespace Address {
  export function init(): Address {
    return {
      country:   undefined,
      city:      undefined,
      street:    undefined,
      latitude:  undefined,
      longitude: undefined
    };
  }
}