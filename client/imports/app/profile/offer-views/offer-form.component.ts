import { Component, OnDestroy, Input, OnInit, OnChanges } from "@angular/core";
import { Point } from "../../../../../both/models/point";
import { Subscription } from "rxjs/Subscription";
import { MeteorObservable } from "meteor-rxjs";
import { UserData } from "../../../../../both/models/user-data";
import { PointCollection } from "../../../../../both/collections/point.collection";
import { OfferCollection } from "../../../../../both/collections/offer.collection";
import { Offer } from "../../../../../both/models/offer";
import ObjectID = Mongo.ObjectID;

@Component({
  selector: "offer-form",
  template: `
    <form (ngSubmit)="saveOffer()">
        <h2>prepare new offer</h2>
        <div>select points</div>
        
        <p *ngFor="let point of points | async">
          <input type="checkbox" 
                 [attr.id]="'cb_' + point.name" 
                 name="selectPoints" 
                 [checked]="selectedPoints.has(point._id)"
                 (change)="select(point, $event.target.checked)"/>
          <label [attr.for]="'cb_' + point.name">{{point.name}} </label>
        </p>
        <div>name: 
            <input [(ngModel)]="offer.name" 
                   type="text" 
                   placeholder="some name"
                   name="name"></div>
        <div>price: 
            <input [(ngModel)]="offer.price" 
                   type="number" 
                   placeholder="1.00"
                   name="price"></div>
        <div>when active: 
            <input [(ngModel)]="offer.whenActive" 
                   type="text" 
                   placeholder="work days 10 - 16"
                   name="whenActive"></div>
        <molecule-builder [molecule]="offer.molecule"></molecule-builder>
        <button type="submit">save</button>
    </form>
    <atom-form [companyId]="companyId"></atom-form>
`
})
export class OfferFormComponent implements  OnDestroy, OnChanges {

  private points;

  @Input()
  private offer: Offer;

  private pointSubscription: Subscription;
  private companyId: Mongo.ObjectID;
  private selectedPoints: Set<ObjectID>;

  constructor() {
    this.companyId = (<UserData>Meteor.user()).companyId;
    this.pointSubscription = MeteorObservable
      .subscribe("company-points", this.companyId)
      .subscribe();

    this.points = PointCollection.find({}).zone();
  }

  select(point, selected) {
    if (selected) {
      this.selectedPoints.add(point._id);
    } else {
      this.selectedPoints.delete(point._id);
    }
    console.log(this.offer.pointIds);
  }

  saveOffer() {
    console.log("try to save", this.offer);
    this.offer.pointIds = Array.from(this.selectedPoints);
    OfferCollection.insert(this.offer);

  }

  ngOnChanges() {
    this.selectedPoints = new Set(this.offer.pointIds);
  }

  ngOnDestroy() {
    this.pointSubscription.unsubscribe();
  }
}
