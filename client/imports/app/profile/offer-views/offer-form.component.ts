import { Component, OnDestroy, Input, OnChanges } from "@angular/core";
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
                 (change)="select(point, $event.target.checked)"
                 [disabled]="!editable"/>
          <label [attr.for]="'cb_' + point.name">{{point.name}} </label>
        </p>
        <div>name: 
            <input [(ngModel)]="offer.name" 
                   type="text" 
                   placeholder="some name"
                   name="name"
                   [disabled]="!editable"></div>
        <div>price: 
            <input [(ngModel)]="offer.price" 
                   type="number" 
                   placeholder="1.00"
                   name="price"
                   [disabled]="!editable"></div>
        <div>when active: 
            <input [(ngModel)]="offer.whenActive" 
                   type="text" 
                   placeholder="work days 10 - 16"
                   name="whenActive"
                   [disabled]="!editable"></div>
        <molecule-builder [molecule]="offer.molecule"></molecule-builder>
        <button *ngIf="editable" type="submit">save</button>
        <button *ngIf="!editable" type="button" (click)="editOffer()">edit</button>
    </form>
    <atom-form [companyId]="companyId"></atom-form>
`
})
export class OfferFormComponent implements  OnDestroy, OnChanges {

  private points;
  private editable = false;

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
  }

  private editOffer() {
    this.editable = true;
  }

  private saveOffer() {
    this.editable = false;
    this.offer.pointIds = Array.from(this.selectedPoints);
    // TODO: use upsert instead of this shit
    if (this.offer._id) {
      OfferCollection.update(this.offer._id, {$set: {
        pointIds: this.offer.pointIds,
        companyId: this.offer.companyId,
        name: this.offer.name,
        whenActive: this.offer.whenActive,
        price: this.offer.price,
        molecule: this.offer.molecule
      }});
    } else {
      OfferCollection.insert(this.offer);
    }
  }

  ngOnChanges() {
    this.selectedPoints = new Set(this.offer.pointIds);
  }

  ngOnDestroy() {
    this.pointSubscription.unsubscribe();
  }
}
