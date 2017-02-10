import { Component, OnChanges, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { MeteorObservable } from "meteor-rxjs";
import { UserData } from "../../../../../both/models/user-data";
import { Offer } from "../../../../../both/models/offer";
import { OfferCollection } from "../../../../../both/collections/offer.collection";
import ObjectID = Mongo.ObjectID;
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "offer-list",
  template: `

<div class="row">
  <div class="col s12 m3 l3">
    <ul class="collection">
        <li *ngFor="let offer of offers | async" 
            (click)="editOffer(offer)"
            class="collection-item"
            [ngClass]="{'active': selectedOffer && selectedOffer._id === offer._id}">
            {{offer.name}} {{offer.price}}
        </li>
        <li class="collection-item" (click)="addNewOffer()">
          <a href="javascript:void(0)">add new offer</a>
        </li>
    </ul>
    
  </div>
  <div *ngIf="selectedOffer" class="col s12 m9 l9">
    <offer-form  (onOfferChanged)="adjustSelected($event)" [offer]="selectedOffer"></offer-form>
  </div>
</div>
`
})
export class OfferListComponent implements OnDestroy {

  private offers;
  private offerSubscription: Subscription;
  private selectedOffer;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((next: any) => {
      if (next.id) {
        this.selectedOffer = OfferCollection.findOne(next.id);
      }
    });

    this.offerSubscription = MeteorObservable
      .subscribe("company-offers", (<UserData>Meteor.user()).companyId)
      .subscribe();
    this.offers = OfferCollection.find({}).zone();
  }

  private addNewOffer() {
    this.selectedOffer = Offer.init((<UserData>Meteor.user()).companyId);
  }

  ngOnDestroy(): void {
    this.offerSubscription.unsubscribe();
  }

  adjustSelected($event) {
    if ($event.deleted) {
      this.selectedOffer = undefined;
    }

    if ($event.created) {
      Object.assign(this.selectedOffer, {_id: $event.offerId});
    }
  }

  editOffer(offer: Offer) {
    this.selectedOffer = offer;
  }
}
