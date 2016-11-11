import { Component, OnDestroy } from "@angular/core";
import { Point } from "../../../../../both/models/point";
import { Subscription } from "rxjs/Subscription";
import { MeteorObservable } from "meteor-rxjs";
import { UserData } from "../../../../../both/models/user-data";
import { PointCollection } from "../../../../../both/collections/point.collection";
import { OfferCollection } from "../../../../../both/collections/offer.collection";
import { Molecule } from "../../../../../both/models/molecule";

@Component({
  selector: 'offer-form',
  template: `
    <form>
        <h2>prepare new offer</h2>
        <div>select points</div>
        
        <p *ngFor="let point of points | async">
          <input type="checkbox" 
                 [attr.id]="'cb_' + point.name" 
                 name="selectPoints" 
                 (change)="select(point, $event.target.checked)"/>
          <label [attr.for]="'cb_'+point.name">{{point.name}} </label>
        </p>
        
        <div>price: 
            <input [(ngModel)]="price" 
                   type="number" 
                   placeholder="1.00"
                   name="price"></div>
        <div>when active: 
            <input [(ngModel)]="whenActive" 
                   type="text" 
                   placeholder="work days 10 - 16"
                   name="whenActive"></div>
        <molecule-builder [molecule]="molecule"></molecule-builder>
        <button (click)="saveOffer()">save</button>
    </form>
    <atom-form [companyId]="companyId"></atom-form>
`
})
export class OfferFormComponent implements  OnDestroy {

  private points;
  private whenActive: string;
  private price: number;
  private molecule: Molecule;

  private pointSubscription: Subscription;
  private selectedPoints: { [key:string]:{point: Point, selected: boolean}; } = {};
  private companyId;


  constructor(){
    this.companyId = (<UserData>Meteor.user()).companyId;
    this.molecule = {
      atoms: [],
      categories: []
    };
    this.pointSubscription = MeteorObservable
      .subscribe("company-points", this.companyId)
      .subscribe();
    this.points = PointCollection.find({}).zone();
    this.selectedPoints = {};
  }

  ngOnDestroy(): void {
    this.pointSubscription.unsubscribe();
  }

  select(point, selected) {
    this.selectedPoints[point.name] = {point, selected};
  }

  saveOffer() {
    Object.keys(this.selectedPoints)
          .filter(k => this.selectedPoints[k].selected)
          .forEach(key => OfferCollection.insert({
      pointId: this.selectedPoints[key].point._id,
      whenActive: this.whenActive,
      price: this.price,
      molecule: this.molecule,
    }));
  }
}
