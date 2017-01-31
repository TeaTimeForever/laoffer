import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { UserProfileModule } from "./profile/user-profile.module";
import { RouterModule } from "@angular/router";
import { preparedAppRoutes } from "./app.routes";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { SharedModule } from "./shared/shared.module";
import { HomeComponent } from "./home/home.component";
import { PointDetailsComponent } from "./home/point-details.component";
import { AtomPreviewComponent } from "./home/atom-preview.component";
import { AvailableOffersComponent } from "./home/available-offers.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AtomPreviewComponent,
    PointDetailsComponent,
    AvailableOffersComponent
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
