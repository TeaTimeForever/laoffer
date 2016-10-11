import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from "./header/header.component";
import { AccountsModule } from "angular2-meteor-accounts-ui";
import { UserProfileModule } from "./profile/user-profile.module";
import { RouterModule } from "@angular/router";
import { preparedAppRoutes } from "./app.routes";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  entryComponents: [
    AppComponent
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  imports: [
    BrowserModule,
    UserProfileModule,
    RouterModule.forRoot(preparedAppRoutes),
    SharedModule.forRoot()
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
