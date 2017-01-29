import ObjectID = Mongo.ObjectID;

export interface Address {
  country: string;
  city: string;
  state?: string;
  zip?: string;
  street: string;
}

export namespace Address {
  export function init() {
    return {
      country: undefined,
      city:    undefined,
      street:  undefined
    };
  }
}