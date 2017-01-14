import { UserProfileComponent } from "./user-profile.component";
import { PointListComponent } from "./points-views/point-list.component";
import { EditablePointComponent } from "./points-views/editable-point.component";
import { OfferFormComponent } from "./offer-views/offer-form.component";
import { OfferListComponent } from "./offer-views/offer-list.component";

const children = {
  toModuleHome: {path: "", component: PointListComponent },
  toOfferList:  {path: "offer-list", component: OfferListComponent },
  toNewPoint:   {path: "new-point", component: EditablePointComponent }
};

export var profileRoutes: any = Object.create(children);
profileRoutes.moduleRoot = {
  path: "profile",
  component: UserProfileComponent,
  children: Object.keys(children).map((k) => children[k])
};
