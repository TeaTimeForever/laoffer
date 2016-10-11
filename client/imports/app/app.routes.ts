import { UserProfileComponent } from "./profile/user-profile.component";
import { Route, Routes } from "@angular/router";
export const routes = {
  toIndex: {path: "", redirectTo: "profile", pathMatch: "full" },
  toProfile: {path: "profile", component: UserProfileComponent }
};

export const preparedAppRoutes: Routes = Object.keys(routes).map((k) => routes[k]);