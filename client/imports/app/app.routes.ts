import { UserProfileComponent } from "./profile/user-profile.component";
import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
export const routes = {
  toIndex: {path: "", component: HomeComponent },
  toProfile: {path: "profile", component: UserProfileComponent }
};

export const preparedAppRoutes: Routes = Object.keys(routes).map((k) => routes[k]);