import { Component, Input, OnChanges, OnDestroy } from "@angular/core";
import { Point } from "../../../../../both/models/point";
import { PointCollection } from "../../../../../both/collections/point.collection";
import { MeteorObservable } from "meteor-rxjs";
import { OfferCollection } from "../../../../../both/collections/offer.collection";
import { Observable } from "rxjs";
import { Offer } from "../../../../../both/models/offer";
import ObjectID = Mongo.ObjectID;

@Component({
  selector: "point-form",
  template: `
<h3 *ngIf="!point._id">Prepare new point</h3>
<h3 *ngIf="point._id && editable">Edit {{point.name}}</h3>
<h3 *ngIf="point._id && !editable">{{point.name}}</h3>
<form (submit)="savePoint()">
  <div class="row">
    <div class="col s6">
      <label for="name">Name</label>
      <input [(ngModel)]="point.name"
             type="text"
             name="name"
             [disabled]="!editable"/>
    </div>
    <div class="col s6">
      <label for="phone">Phone</label>
      <input [(ngModel)]="point.phone"
                 type="text"
                 name="phone"
                 [disabled]="!editable"/>
    </div>
  </div>
  <address-fieldset [address]="point.address" [editable]="editable"></address-fieldset>
  <ul>
  <li *ngFor="let o of offers | async">{{o.name}}</li>
  </ul>

  <button class="waves-effect waves-light btn"
          *ngIf="editable"
          type="submit">Save</button>
  <button *ngIf="!editable"
          type="button"
          (click)="editPoint()"
          class="waves-effect waves-light btn">Edit</button>
  <button *ngIf="!editable && point._id"
          type="button" 
          (click)="deletePoint(point)"
          class="red darken-1 waves-effect waves-light btn">Delete</button>
</form>
`
})
export class PointFormComponent implements OnChanges, OnDestroy {
  @Input()
  private point: Point;

  private editable;

  private offerSubscription;
  private offers: Observable<Offer[]>;

  constructor () {
    this.offerSubscription = MeteorObservable
      .subscribe("point-offers", this.point._id)
      .subscribe();
    this.offers = OfferCollection.find({});
  }

  ngOnDestroy(): void {
    this.offerSubscription.unsubscribe();
  }

  ngOnChanges(): void {
    this.editable = !this.point._id;
  }


  private editPoint() {
    this.editable = true;
  }

  private deletePoint(point: Point) {
    Meteor.call("points.remove", point._id);
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
