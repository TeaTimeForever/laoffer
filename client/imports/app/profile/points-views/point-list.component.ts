import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { MeteorObservable } from "meteor-rxjs";
import { UserData } from "../../../../../both/models/user-data";
import { PointCollection } from "../../../../../both/collections/point.collection";
import { Point } from "../../../../../both/models/point";
import ObjectID = Mongo.ObjectID;

@Component({
  selector: "point-list",
  template: `

<div class="row">
  <div class="col s12 m3 l3">
    <ul class="collection">
      <li *ngFor="let point of points | async" 
          (click)="editPoint(point)" 
          class="collection-item" 
          [ngClass]="{'active': selectedPoint && selectedPoint._id === point._id}">
          {{point.name}}
      </li>
      <li class="collection-item" (click)="addNewPoint()">
        <a href="javascript:void(0)">Add new point</a>
      </li>
    </ul>
  </div>
  <div *ngIf="selectedPoint" class="col s12 m9 l9">
    <point-form (onPointChanged)="adjustSelected($event)" [point]="selectedPoint"></point-form>
  </div>
</div>
`
})
export class PointListComponent implements OnDestroy {

  private points;
  private pointSubscription: Subscription;
  private selectedPoint;

  constructor() {
    this.pointSubscription = MeteorObservable
      .subscribe("company-points", (<UserData>Meteor.user()).companyId)
      .subscribe();
    this.points = PointCollection.find({}).zone();
  }

  adjustSelected($event) {
    debugger;
    if ($event.deleted) {
      this.selectedPoint = undefined;
    }

    if ($event.created) {
      Object.assign(this.selectedPoint, {_id: $event.pointId});
    }
  }

  private addNewPoint(): void {
    this.selectedPoint = Point.init((<UserData>Meteor.user()).companyId);
  }

  ngOnDestroy(): void {
    this.pointSubscription.unsubscribe();
  }

  editPoint(point: Point) {
    this.selectedPoint = point;
  }
}
