import { Component, OnDestroy } from "@angular/core";
import { Point } from "../../../../../both/models/point";
import { Subscription } from "rxjs/Subscription";
import { MeteorObservable } from "meteor-rxjs";
import { UserData } from "../../../../../both/models/user-data";
import { PointCollection } from "../../../../../both/collections/point.collection";
import { OfferCollection } from "../../../../../both/collections/offer.collection";
import { Molecule } from "../../../../../both/models/molecule";
import { Offer } from "../../../../../both/models/offer";

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
export class OfferFormComponent implements  OnDestroy {

  private points;
  private offer: Offer;

  private pointSubscription: Subscription;
  private selectedPoints: {[key: string]: {point: Point, selected: boolean}} = {};
  private companyId: Mongo.ObjectID;

  constructor() {
    this.offer = Offer.init();
    this.offer.molecule = {
      atoms: [],
      categories: []
    };
    this.companyId = (<UserData>Meteor.user()).companyId;
    this.pointSubscription = MeteorObservable
      .subscribe("company-points", this.companyId)
      .subscribe();

    // TODO: remove points. Should use only one tmp variable
    this.points = PointCollection.find({}).zone();
  }

  select(point, selected) {
    this.selectedPoints[point._id] = {point, selected};
  }

  saveOffer() {
    this.offer.pointIds = Object.keys(this.selectedPoints)
      .filter(k => this.selectedPoints[k].selected);
    OfferCollection.insert(this.offer);
  }

  ngOnDestroy() {
    this.pointSubscription.unsubscribe();
  }
}
