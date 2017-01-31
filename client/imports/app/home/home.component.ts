import { Component, OnDestroy } from "@angular/core";
import { PointCollection } from "../../../../both/collections/point.collection";
import { MeteorObservable } from "meteor-rxjs";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs";
import { Point } from "../../../../both/models/point";

@Component({
  selector: "home",
  template: `
    <div class="row">
      <div class="col s12 m8 l8">
        <sebm-google-map
                [latitude]="centerLat"
                [longitude]="centerLng"
                [zoom]="13"
                style="width: 100%; height: 400px;">
          <sebm-google-map-marker *ngFor="let point of points | async"
                                  [latitude]="point.address.latitude"
                                  [longitude]="point.address.longitude"
                                  [title]="point.name"
                                  [label]="point.description"
                                  [id]="point._id"
                                  (markerClick)="pointClicked(point._id)"></sebm-google-map-marker>
        </sebm-google-map>
      </div>
      <div class="col s12 m4 l4">
        <available-offers ></available-offers>
      </div>
    </div>
    <div class="row" *ngIf="selectedPoint">
      <point-details [point]="selectedPoint"></point-details>
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
    this.pointSubscription = MeteorObservable.subscribe("points").subscribe();
    this.points = PointCollection.find({}).zone();
  }

  pointClicked($event) {
    // TODO: shouldnt use this hack with source (this.points.source._data)
    this.selectedPoint = this.points["source"]["_data"].find((p: Point) => p._id === $event);
  }

  ngOnDestroy(): void {
    this.pointSubscription.unsubscribe();
  }
}
