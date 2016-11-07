import { Component, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs/Subscription';
import { profileRoutes } from "../user-profile.routes";
import { Router } from "@angular/router";
import { MeteorObservable } from "meteor-rxjs";
import { UserData } from "../../../../../both/models/user-data";
import { PointCollection } from "../../../../../both/collections/point.collection";

@Component({
  selector: 'main-profile-view',
  template: `
    <ul>
        <li *ngFor="let point of points | async">
            {{point.name}}
        </li>
    </ul>
    <a (click)="goToNewPoint()" href="javascript:void(0)">add new point</a>
    <hr>
    <a (click)="goToNewOffer()" href="javascript:void(0)">add new offer</a>
`
})
export class InitProfileComponent implements OnDestroy {

  private points;
  private pointSubscription: Subscription;

  constructor(private router: Router){
    this.pointSubscription = MeteorObservable
      .subscribe("company-points", (<UserData>Meteor.user()).companyId)
      .subscribe();
    this.points = PointCollection.find({}).zone();
  }

  goToNewPoint(): void {
    this.router.navigate([profileRoutes.moduleRoot.path, profileRoutes.toNewPoint.path]);
  }

  goToNewOffer(): void {
    this.router.navigate([profileRoutes.moduleRoot.path, profileRoutes.toNewOffer.path]);
  }

  ngOnDestroy(): void {
    this.pointSubscription.unsubscribe();
  }
}
