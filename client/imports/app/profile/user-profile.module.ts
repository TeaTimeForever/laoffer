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
import { AtomLabelComponent } from "./atom-views/atom-label.component";
import { DragulaModule } from "ng2-dragula/ng2-dragula";
import { MoleculaBuilderComponent } from "./offer-views/molecula-builder.component";

@NgModule({
  declarations: [
    UserProfileComponent,
    PointFormComponent,
    InitProfileComponent,
    EditablePointComponent,
    OfferFormComponent,
    AtomLabelComponent,
    MoleculaBuilderComponent
  ],
  exports: [ UserProfileComponent ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild([profileRoutes.moduleRoot]),
    DragulaModule
  ]
})
export class UserProfileModule {}
