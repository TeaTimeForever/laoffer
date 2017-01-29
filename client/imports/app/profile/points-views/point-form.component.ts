import { Component, Input, OnInit } from "@angular/core";
import { Point } from "../../../../../both/models/point";
import { PointCollection } from "../../../../../both/collections/point.collection";
import ObjectID = Mongo.ObjectID;

@Component({
  selector: "point-form",
  template: `
<h3>Please add info about your new point</h3>
<form (submit)="savePoint()">
  <div class="row">
    <div class="col s6">
      <label for="name">Name</label>
      <input [(ngModel)]="point.name"
             type="text"
             name="name"
             placeholder="name"
             [disabled]="!editable"/>
    </div>
    <div class="col s6">
      <label for="phone">Phone</label>
      <input [(ngModel)]="point.phone"
                 type="text"
                 name="phone"
                 placeholder="phone"
                 [disabled]="!editable"/>
    </div>
  </div>
  <address-fieldset [address]="point.address" [editable]="editable"></address-fieldset>

  <button class="waves-effect waves-light btn"
          *ngIf="editable"
          type="submit">Save</button>
  <button *ngIf="!editable"
          type="button"
          (click)="editPoint()"
          class="waves-effect waves-light btn">Edit</button>
</form>
`
})
export class PointFormComponent implements OnInit {
  @Input()
  private point: Point;

  private editable;

  ngOnInit(): void {
    this.editable = !this.point._id;
    console.log("LOADED POINT", this.point);
  }

  private editPoint() {
    this.editable = true;
  }

  savePoint(): void {
    this.editable = false;
    console.log("submit processing");
    if (!Meteor.userId()) {
      alert("please login");
    } else {
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
    }
  }
}
