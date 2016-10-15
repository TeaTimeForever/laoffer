import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Point } from "../../../../../../both/models/point";
import { Address } from "../../../../../../both/models/address";
import { PointCollection } from "../../../../../../both/collections/point.collection";
import { profileRoutes } from "../../user-profile.routes";

@Component({
  selector: 'point-form',
  template: `
    <h3>Please add info about your new point</h3>
    <form (submit)="addNewPoint()">
        <address-fieldset [address]="point.address"></address-fieldset>
        <input [(ngModel)]="point.phone"
               type="text"
               name="phone"
               placeholder="phone" /><br>
               
        <input [(ngModel)]="point.name"
               type="text"
               name="name"
               placeholder="name" /><br>
         
    </form>
    <button (click)="addNewPoint()" >add new point</button>
    <button (click)="goToProfile()" >go back</button>
`
})
export class PointFormComponent implements OnInit {
  @Input()
  private point: Point;

  constructor(private router: Router){}

  ngOnInit(): void {
    if (!this.point) {
      this.point = new Point();
      this.point.address = new Address();
    }
    console.log("LOADED POINT", this.point);
  }

  addNewPoint(): void {
    console.log("submit processing");
    if(!Meteor.userId()) {
      alert("please login");
    } else {
      console.log("POINT ON SUBMIT", this.point);
      PointCollection.insert(this.point);
      this.goToProfile();
    }
  }

  goToProfile() {
    this.router.navigateByUrl(profileRoutes.moduleRoot.path);
  }
}
