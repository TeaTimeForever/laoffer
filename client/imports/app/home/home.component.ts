import { Component, OnDestroy } from "@angular/core";
import { PointCollection } from "../../../../both/collections/point.collection";
import { MeteorObservable } from "meteor-rxjs";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'home',
  template: `
home component
<a href="/#/profile">go to profile</a>
<sebm-google-map
  [latitude]="centerLat"
  [longitude]="centerLng"
  [zoom]="8"
  style="width: 500px; height: 500px;">
  <sebm-google-map-marker *ngFor="let point of points | async"
    [latitude]="point.geoLocation.lat"
    [longitude]="point.geoLocation.lng"
    [title]="point.name"
    [label]="point.description"
    (markerClick)="pointClicked($event)"></sebm-google-map-marker>
</sebm-google-map>
`
})
export class HomeComponent implements OnDestroy {
  private centerLat: number = 56.9711614;
  private centerLng: number = 23.8500817;
  private pointSubscription: Subscription;
  private points;

  constructor(){
    this.pointSubscription = MeteorObservable
      .subscribe("points")
      .subscribe();
    this.points = PointCollection.find({}).zone();
  }

  pointClicked($event) {
    console.log($event);
  }

  ngOnDestroy(): void {
    this.pointSubscription.unsubscribe();
  }
}
