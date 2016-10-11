import { PointFormComponent } from "./points-management/point-form/point-form.component";
import { UserProfileComponent } from "./user-profile.component";
import { InitProfileComponent } from "./init-profile/init-profile.component";

const children = {
  toModuleHome: {path: "", component: InitProfileComponent },
  toNewPoint: {path: "new-point", component: PointFormComponent },
  toNewOffer: {path: "new-offer", component: PointFormComponent }
};

export let profileRoutes: any = Object.create(children);
profileRoutes.moduleRoot = {
  path: "profile",
  component: UserProfileComponent,
  children: Object.keys(children).map((k) => children[k])
};

export function getRootRelativePath(child: string) {
  return profileRoutes.moduleRoot.path + "/" + child;
}