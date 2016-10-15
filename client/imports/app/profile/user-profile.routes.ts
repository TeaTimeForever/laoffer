import { UserProfileComponent } from "./user-profile.component";
import { InitProfileComponent } from "./init-profile/init-profile.component";
import { EditablePointComponent } from "./points-views/point-form/editable-point.component";

const children = {
  toModuleHome: {path: "", component: InitProfileComponent },
  toNewPoint: {path: "new-point", component: EditablePointComponent },
  toNewOffer: {path: "new-offer", component: EditablePointComponent }
};

export var profileRoutes: any = Object.create(children);
profileRoutes.moduleRoot = {
  path: "profile",
  component: UserProfileComponent,
  children: Object.keys(children).map((k) => children[k])
};
