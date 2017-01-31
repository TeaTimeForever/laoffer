import { Component, OnDestroy } from "@angular/core";
import { MeteorObservable } from "meteor-rxjs";
import { Subscription } from "rxjs/Subscription";
import { OfferCollection } from "../../../../both/collections/offer.collection";
import { Observable } from "rxjs";
import { Offer } from "../../../../both/models/offer";
import ObjectID = Mongo.ObjectID;

@Component({
  selector: "available-offers",
  template: `
<div class="container">
    <ul class="collection" 
        data-collapsible="accordion" 
        materialize="collapsible">
      <li class="collection-item avatar" 
          *ngFor="let offer of offers | async"
          (click)="selectOffer(offer)"
          [ngClass]="{'active': selectedOffer && selectedOffer._id === offer._id}">
        <i class="material-icons circle">restaurant</i>
        <span class="green white-text badge" data-badge-caption="EUR">{{offer.name}} {{offer.price}} EUR</span>
        <atom-preview [atom]="atom" *ngFor="let atom of offer.molecule.atoms"></atom-preview>
        <div *ngFor="let category of offer.molecule.categories">{{category}}</div>
      </li>
    </ul>
</div>
`
})
export class AvailableOffersComponent implements OnDestroy {

  selectedOffer: Offer;

  private offerSubscription: Subscription;
  private offers: Observable<Offer[]>;

  constructor() {
    this.offerSubscription = MeteorObservable
      .subscribe("offers")
      .subscribe();
    this.offers = OfferCollection.find({});
  }

  private selectOffer(offer: Offer) {
    this.selectedOffer = offer;
  }

  ngOnDestroy(): void {
    this.offerSubscription.unsubscribe();
  }
}
