import { Component, Input, OnChanges, OnDestroy, OnInit } from "@angular/core";
import { Point } from "../../../../../both/models/point";
import { PointCollection } from "../../../../../both/collections/point.collection";
import { MeteorObservable } from "meteor-rxjs";
import { OfferCollection } from "../../../../../both/collections/offer.collection";
import { Observable, Subscription } from "rxjs";
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
  <ul class="collection" *ngIf="point._id">
    <li class="collection-item avatar" *ngFor="let offer of offers | async">
      <i class="material-icons circle">restaurant</i>
      <a [routerLink]="'offers'"><span class="title">{{offer.name}}</span></a>
      <p>
        <span *ngFor="let atom of offer.molecule.atoms">{{atom.name}} </span>
        <span *ngFor="let category of offer.molecule.categories">{{category}} </span>
      </p>
      <a href="#!" class="secondary-content">{{offer.price}}</a>
    </li>
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

  private offerSubscription: Subscription;
  private offers: Observable<Offer[]>;


  ngOnChanges(): void {
    if (this.offerSubscription) {
      this.offerSubscription.unsubscribe();
    }
    this.offerSubscription = MeteorObservable
      .subscribe("point-offers", this.point._id)
      .subscribe();
    this.offers = OfferCollection.find({});

    this.editable = !this.point._id;
  }

  ngOnDestroy(): void {
    this.offerSubscription.unsubscribe();
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
