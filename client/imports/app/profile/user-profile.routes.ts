import { UserProfileComponent } from "./user-profile.component";
import { PointListComponent } from "./points-views/point-list.component";
import { OfferListComponent } from "./offer-views/offer-list.component";

const children = {
  toModuleHome: {path: "", component: PointListComponent },
  toOffers:  {path: "offers", component: OfferListComponent },
  toConcreteOffer:  {path: "offers/:id", component: OfferListComponent }
};

export var profileRoutes: any = Object.create(children);
profileRoutes.moduleRoot = {
  path: "profile",
  component: UserProfileComponent,
  children: Object.keys(children).map((k) => children[k])
};
