import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Point } from "../../../../../both/models/point";
import { PointCollection } from "../../../../../both/collections/point.collection";
import { profileRoutes } from "../user-profile.routes";
import ObjectID = Mongo.ObjectID;

@Component({
  selector: "point-form",
  template: `
<h3>Please add info about your new point</h3>
<form (submit)="savePoint()">
  <address-fieldset [address]="point.address"></address-fieldset>
  <div class="row">
    <div class="col s6">
      <div class="row">
        <div class="col s6">
          <label for="phone">Phone</label>
          <input [(ngModel)]="point.phone"
                     type="text"
                     name="phone"
                     placeholder="phone"
                     [disabled]="!editable"
                      />
        </div>
        <div class="col s6">
          <label for="name">Name</label>
          <input [(ngModel)]="point.name"
                 type="text"
                 name="name"
                 placeholder="name" />
        </div>
      </div>
    </div>
  </div>

  <button (click)="savePoint()" >save</button>
  <button (click)="goToProfile()" >go back</button>
</form>
`
})
export class PointFormComponent implements OnInit {
  @Input()
  private point: Point;

  private editable;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.editable = !this.point._id;
    console.log("LOADED POINT", this.point);
  }

  savePoint(): void {
    console.log("submit processing");
    if (!Meteor.userId()) {
      alert("please login");
    } else {
      console.log("POINT ON SUBMIT", this.point);

      // TODO: use upsert instead of this shit
      if (this.point._id) {
        PointCollection.update(this.point._id, {$set: {
          name: this.point.name,
          address: this.point.address,
          phone: this.point.phone
        }});
      } else {
        PointCollection.insert(this.point);
      }
      this.goToProfile();
    }
  }

  goToProfile() {
    this.router.navigateByUrl(profileRoutes.moduleRoot.path);
  }
}
