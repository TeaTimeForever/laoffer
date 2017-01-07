import { UserProfileComponent } from "./user-profile.component";
import { OfferListComponent } from "./offer-views/offer-list.component";
import { EditablePointComponent } from "./points-views/point-form/editable-point.component";
import { OfferFormComponent } from "./offer-views/offer-form.component";

const children = {
  toModuleHome: {path: "", component: OfferListComponent },
  toNewPoint: {path: "new-point", component: EditablePointComponent },
  toNewOffer: {path: "new-offer", component: OfferFormComponent },
  toOfferList: {path: "offer-list", component: OfferListComponent }
};

export var profileRoutes: any = Object.create(children);
profileRoutes.moduleRoot = {
  path: "profile",
  component: UserProfileComponent,
  children: Object.keys(children).map((k) => children[k])
};
