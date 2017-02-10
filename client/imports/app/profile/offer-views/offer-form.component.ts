import { Component, Input, OnChanges, OnDestroy, Output } from "@angular/core";
import { MeteorObservable } from "meteor-rxjs";
import { UserData } from "../../../../../both/models/user-data";
import { PointCollection } from "../../../../../both/collections/point.collection";
import { OfferCollection } from "../../../../../both/collections/offer.collection";
import { Offer } from "../../../../../both/models/offer";
import { Subject, Subscription } from "rxjs";
import ObjectID = Mongo.ObjectID;

@Component({
  selector: "offer-form",
  template: `
<form (ngSubmit)="saveOffer()">
  <h3 *ngIf="!offer._id">Prepare new offer</h3>
  <h3 *ngIf="offer._id && editable">Edit {{offer.name}}</h3>
  <h3 *ngIf="offer._id && !editable">{{offer.name}}</h3>
  
  <div class="row">
    <div class="col s6">
      <label for="selectPoints">Choose points</label>
      <p *ngFor="let point of points | async">
        <input type="checkbox" 
               [attr.id]="'cb_' + point.name" 
               name="selectPoints" 
               [checked]="selectedPoints.has(point._id)"
               (change)="select(point, $event.target.checked)"
               [disabled]="!editable"/>
        <label [attr.for]="'cb_' + point.name">{{point.name}}</label>
        <a [routerLink]="'../points/' + point._id">go to details</a>
      </p>
    </div>
    <div class="col s6">
      <label for="name">Title</label>
      <input [(ngModel)]="offer.name" 
             type="text" 
             placeholder="some name"
             name="name"
             [disabled]="!editable">
    </div>
  </div>
  <div class="row">
    <div class="col s6">
      <label for="price">Price</label>
      <input [(ngModel)]="offer.price" 
             type="number" 
             placeholder="1.00"
             name="price"
             [disabled]="!editable"></div>
    <div class="col s6">
      <label for="whenActive">When active</label>
      <input [(ngModel)]="offer.whenActive" 
             type="text" 
             placeholder="work days 10 - 16"
             name="whenActive"
             [disabled]="!editable"></div>
  </div>
  <molecule-builder class="row" *ngIf="editable" [molecule]="offer.molecule"></molecule-builder>
  <molecule-preview *ngIf="!editable" [molecule]="offer.molecule"></molecule-preview>
  <br>
  <button class="waves-effect waves-light btn" 
          *ngIf="editable" 
          type="submit">Save</button>
  <button *ngIf="!editable" 
          type="button" 
          (click)="editOffer()"
          class="waves-effect waves-light btn">Edit</button>
  <button *ngIf="!editable && offer._id" 
          type="button" 
          (click)="deleteOffer(offer)"
          class="red darken-1 waves-effect waves-light btn">Delete</button>
</form>

<atom-form [companyId]="companyId"></atom-form>
`
})
export class OfferFormComponent implements  OnDestroy, OnChanges {

  private points;
  private editable;

  @Input()
  private offer: Offer;

  @Output()
  private onOfferChanged;

  private offerChangedSubject = new Subject();

  private pointSubscription: Subscription;
  private routeIdSubscription: Subscription;
  private companyId: Mongo.ObjectID;
  private selectedPoints: Set<ObjectID>;

  constructor() {

    this.onOfferChanged = this.offerChangedSubject.asObservable();

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

  private deleteOffer(offer: Offer) {
    this.unsubscribe();
    Meteor.call("offer.remove", offer._id);
    this.offerChangedSubject.next({
      deleted: true
    });
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
      OfferCollection.insert(this.offer)
        .subscribe(newId => {
          this.offerChangedSubject.next({
            created: true,
            offerIf: newId
          });
        });
    }
  }

  ngOnChanges() {
    this.selectedPoints = new Set(this.offer.pointIds);
    this.editable = !this.offer._id;
  }

  unsubscribe() {
    if (this.pointSubscription) {
      this.pointSubscription.unsubscribe();
    }

    if (this.routeIdSubscription) {
      this.routeIdSubscription.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
