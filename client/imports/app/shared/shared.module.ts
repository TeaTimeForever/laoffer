import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AccountsModule } from "angular2-meteor-accounts-ui";
import { AddressFieldsetComponent } from "./components/address-fieldset/address-fieldset.component";

@NgModule({
  declarations: [
    AddressFieldsetComponent
  ],
  exports: [
    AccountsModule,
    AddressFieldsetComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
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