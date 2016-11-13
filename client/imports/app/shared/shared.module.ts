import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AccountsModule } from "angular2-meteor-accounts-ui";
import { AddressFieldsetComponent } from "./components/address-fieldset/address-fieldset.component";
import { AgmCoreModule } from "angular2-google-maps/core";
import { MaterializeDirective } from "angular2-materialize";

@NgModule({
  declarations: [
    AddressFieldsetComponent,
    MaterializeDirective
  ],
  exports: [
    AccountsModule,
    AddressFieldsetComponent,
    AgmCoreModule,
    MaterializeDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAWoBdZHCNh5R-hB5S5ZZ2oeoYyfdDgniA"
    })
  ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}