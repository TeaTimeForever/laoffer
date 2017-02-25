import { NgModule } from "@angular/core";
import { UserProfileComponent } from "./user-profile.component";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { PointFormComponent } from "./points-views/point-form.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { profileRoutes } from "./user-profile.routes";
import { PointListComponent } from "./points-views/point-list.component";
import { EditablePointComponent } from "./points-views/editable-point.component";
import { OfferFormComponent } from "./offer-views/offer-form.component";
import { AtomLabelComponent } from "./atom-views/atom-label.component";
import { DragulaModule } from "ng2-dragula/ng2-dragula";
import { MoleculeBuilderComponent } from "./offer-views/molecule-builder.component";
import { AtomFormComponent } from "./atom-views/atom-form.component";
import { CategoryLabelComponent } from "./atom-views/category-label.component";
import { OfferListComponent } from "./offer-views/offer-list.component";
import { MoleculePreviewComponent } from "./offer-views/molecule-preview.component";
import { ActiveTimeComponent } from "./offer-views/active-time.component";

@NgModule({
  declarations: [
    UserProfileComponent,
    PointFormComponent,
    PointListComponent,
    EditablePointComponent,
    OfferFormComponent,
    OfferListComponent,
    MoleculeBuilderComponent,
    AtomFormComponent,
    AtomLabelComponent,
    CategoryLabelComponent,
    MoleculePreviewComponent
    // ActiveTimeComponent
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
