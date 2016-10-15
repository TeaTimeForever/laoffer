import { NgModule } from "@angular/core";
import { UserProfileComponent } from "./user-profile.component";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { PointFormComponent } from "./points-views/point-form/point-form.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { profileRoutes } from "./user-profile.routes";
import { InitProfileComponent } from "./init-profile/init-profile.component";
import { EditablePointComponent } from "./points-views/point-form/editable-point.component";
import { OfferFormComponent } from "./offer-views/offer-form.component";

@NgModule({
  declarations: [
    UserProfileComponent,
    PointFormComponent,
    InitProfileComponent,
    EditablePointComponent,
    OfferFormComponent
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
