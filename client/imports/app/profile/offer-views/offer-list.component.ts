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
  selector: "main-profile-view",
  template: `

<div class="row">
  <div class="col s12 m6 l6">
    <ul>
        <li *ngFor="let point of points | async">
            {{point.name}} 
            <button type="button" (click)="editPoint(point)">edit</button>
            <button type="button" (click)="deletePoint(point)">delete</button>
        </li>
    </ul>
    <a (click)="goToNewPoint()" href="javascript:void(0)">add new point</a>
  </div>
  <div *ngIf="selectedPoint" class="col s12 m6 l6">
    <point-form [point]="selectedPoint"></point-form>
  </div>
</div>
`
})
export class OfferListComponent implements OnDestroy {

  private points;
  private pointSubscription: Subscription;
  private selectedPoint;

  constructor(private router: Router){
    this.pointSubscription = MeteorObservable
      .subscribe("company-points", (<UserData>Meteor.user()).companyId)
      .subscribe();
    this.points = PointCollection.find({}).zone();
  }

  private goToNewPoint(): void {
    this.router.navigate([profileRoutes.moduleRoot.path, profileRoutes.toNewPoint.path]);
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
