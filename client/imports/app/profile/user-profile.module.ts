import { NgModule } from "@angular/core";
import { UserProfileComponent } from "./user-profile.component";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { PointFormComponent } from "./points-management/point-form/point-form.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { profileRoutes } from "./user-profile.routes";
import { InitProfileComponent } from "./init-profile/init-profile.component";

@NgModule({
  declarations: [
    UserProfileComponent,
    PointFormComponent,
    InitProfileComponent
  ],
  exports: [ UserProfileComponent ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild([profileRoutes.moduleRoot])
  ]
})
export class UserProfileModule {}
