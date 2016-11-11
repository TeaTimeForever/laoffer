import { Component, OnDestroy, Input, OnChanges } from "@angular/core";
import { MeteorObservable } from "meteor-rxjs";
import { Subscription } from "rxjs/Subscription";
import { OfferCollection } from "../../../../both/collections/offer.collection";
import ObjectID = Mongo.ObjectID;
import { Observable } from "rxjs";
import { Offer } from "../../../../both/models/offer";
import { Point } from "../../../../both/models/point";

@Component({
  selector: "point-offers",
  template: `
    <div class="container">
        <h5 *ngIf="point">{{point.name}}</h5>
        <div class="card" *ngFor="let offer of offers | async">
          
          <ul class="collapsible" data-collapsible="accordion" materialize="collapsible">
            <li class="collection-item" *ngFor="let atom of offer.molecule.atoms">
              <div class="collapsible-header">{{atom.name}}
                <span class="badge">{{atom.price}} EUR</span>
                 <div class="chip" *ngFor="let tag of atom.tags">
                  {{tag}}
                </div>
                <div class="chip">
                  {{atom.category}}
                </div>
              </div>
              <div class="collapsible-body"><p>{{atom.description}}</p></div>
            </li>
            <li class="collection-item" *ngFor="let category of offer.molecule.categories">
              <div class="collapsible-header">{{category}}</div>
            </li>
            <li class="collection-item">
              <div class="collapsible-header"><i class="material-icons">euro_symbol</i>{{offer.price}}</div>
            </li>
          </ul>
        </div>
    </div>
`
})
export class PointOffersComponent implements OnDestroy, OnChanges {

  @Input()
  point: Point;

  private offerSubscription: Subscription;
  private offers: Observable<Offer[]>;

  ngOnChanges() {
    console.log(this.point);
    if(this.point) {
      this.offerSubscription = MeteorObservable
        .subscribe("point-offers", this.point._id)
        .subscribe();
      this.offers = OfferCollection.find({}).zone();
    }
  }

  ngOnDestroy(): void {
    if (this.offerSubscription) {
      this.offerSubscription.unsubscribe();
    }
  }
}
