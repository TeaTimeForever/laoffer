import { Component, OnDestroy } from "@angular/core";
import { PointCollection } from "../../../../both/collections/point.collection";
import { MeteorObservable } from "meteor-rxjs";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs";
import { Point } from "../../../../both/models/point";

@Component({
  selector: 'home',
  template: `
<div class="row">
  <div class="col s12 m6 l6">
    <sebm-google-map
      [latitude]="centerLat"
      [longitude]="centerLng"
      [zoom]="13"
      style="width: 100%; height: 400px;">
      <sebm-google-map-marker *ngFor="let point of points | async"
        [latitude]="point.geoLocation.lat"
        [longitude]="point.geoLocation.lng"
        [title]="point.name"
        [label]="point.description"
        [id]="point._id"
        (markerClick)="pointClicked(point._id)"></sebm-google-map-marker>
    </sebm-google-map>
  </div>
  <div class="col s12 m6 l6">
    <point-offers [point]="selectedPoint"></point-offers>
  </div>
</div>
`
})
export class HomeComponent implements OnDestroy {
  private centerLat: number = 56.9512274;
  private centerLng: number = 24.1019255;
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
