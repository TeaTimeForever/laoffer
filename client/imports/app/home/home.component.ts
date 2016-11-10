import { Component, OnDestroy } from "@angular/core";
import { PointCollection } from "../../../../both/collections/point.collection";
import { MeteorObservable } from "meteor-rxjs";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs";
import { Point } from "../../../../both/models/point";

@Component({
  selector: 'home',
  template: `
home component
<a href="/#/profile">go to profile</a>
<br>
<div class="display: flex;">
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
      [id]="point._id"
      (markerClick)="pointClicked($event)"></sebm-google-map-marker>
  </sebm-google-map>
  <point-offers [point]="selectedPoint"></point-offers>
</div>
`
})
export class HomeComponent implements OnDestroy {
  private centerLat: number = 56.9711614;
  private centerLng: number = 23.8500817;
  private pointSubscription: Subscription;
  private points: Observable<Point[]>;
  private selectedPoint: Point;

  constructor() {
    this.pointSubscription = MeteorObservable
      .subscribe("points")
      .subscribe();
    this.points = PointCollection.find({}).zone();
  }

  pointClicked($event) {
    this.selectedPoint = this.points.source._data.find((p: Point) => p._id === $event);
  }

  ngOnDestroy(): void {
    this.pointSubscription.unsubscribe();
  }
}
