import { Component, OnDestroy, Input, OnChanges } from "@angular/core";
import { MeteorObservable } from "meteor-rxjs";
import { Subscription } from "rxjs/Subscription";
import { OfferCollection } from "../../../../both/collections/offer.collection";
import { Observable } from "rxjs";
import { Offer } from "../../../../both/models/offer";
import { Point } from "../../../../both/models/point";
import ObjectID = Mongo.ObjectID;

@Component({
  selector: "point-offers",
  template: `
    <div class="container">
        <h5 *ngIf="point">{{point.name}}</h5>
        <ul class="collection" data-collapsible="accordion" materialize="collapsible">
          <li class="collection-item avatar" *ngFor="let offer of offers | async">
            <i class="material-icons circle">restaurant</i>
            <span class="teal white-text badge" data-badge-caption="EUR">{{offer.name}} {{offer.price}} EUR</span>
            <atom-preview [atom]="atom" *ngFor="let atom of offer.molecule.atoms"></atom-preview>
            <div *ngFor="let category of offer.molecule.categories">{{category}}</div>
            
          </li>
        </ul>
    </div>
`
})
export class PointOffersComponent implements OnDestroy, OnChanges {

  @Input()
  point: Point;

  private offerSubscription: Subscription;
  private offers: Observable<Offer[]>;

  constructor() {
    this.offerSubscription = MeteorObservable
      .subscribe("all-offers")
      .subscribe();
  }

  ngOnChanges() {
    console.log("point changed", this.point);
    if (this.point) {
      this.offers = OfferCollection.find({pointIds: { $in: [this.point._id.toString()]}}, {}).zone();
    }
  }

  ngOnDestroy(): void {
    if (this.offerSubscription) {
      this.offerSubscription.unsubscribe();
    }
  }
}
