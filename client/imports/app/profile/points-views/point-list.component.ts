import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { profileRoutes } from "../user-profile.routes";
import { Router } from "@angular/router";
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
    <ul>
        <li *ngFor="let point of points | async" (click)="editPoint(point)">
            {{point.name}} 
            <button type="button" (click)="deletePoint(point)">delete</button>
        </li>
    </ul>
    <a (click)="addNewPoint()" href="javascript:void(0)">add new point</a>
  </div>
  <div *ngIf="selectedPoint" class="col s12 m9 l9">
    <point-form [point]="selectedPoint"></point-form>
  </div>
</div>
`
})
export class PointListComponent implements OnDestroy {

  private points;
  private pointSubscription: Subscription;
  private selectedPoint;

  constructor(private router: Router){
    this.pointSubscription = MeteorObservable
      .subscribe("company-points", (<UserData>Meteor.user()).companyId)
      .subscribe();
    this.points = PointCollection.find({}).zone();
  }

  private addNewPoint(): void {
    this.selectedPoint = Point.init((<UserData>Meteor.user()).companyId);
  }

  ngOnDestroy(): void {
    this.pointSubscription.unsubscribe();
  }

  private deletePoint(point: Point) {
    Meteor.call("points.remove", point._id);
  }

  editPoint(point: Point) {
    this.selectedPoint = point;
  }
}
