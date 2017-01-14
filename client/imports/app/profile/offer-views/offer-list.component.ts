import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { profileRoutes } from "../user-profile.routes";
import { Router } from "@angular/router";
import { MeteorObservable } from "meteor-rxjs";
import { UserData } from "../../../../../both/models/user-data";
import { PointCollection } from "../../../../../both/collections/point.collection";
import { Point } from "../../../../../both/models/point";
import ObjectID = Mongo.ObjectID;
import { Offer } from "../../../../../both/models/offer";
import { OfferCollection } from "../../../../../both/collections/offer.collection";

@Component({
  selector: "offer-list",
  template: `

<div class="row">
  <div class="col s12 m6 l6">
    <ul>
        <li *ngFor="let offer of offers | async">
            {{offer.price}} 
            <button type="button" (click)="editOffer(offer)">edit</button>
            <button type="button" (click)="deleteOffer(offer)">delete</button>
        </li>
    </ul>
    <a (click)="addNewOffer()" href="javascript:void(0)">add new offer</a>
  </div>
  <div *ngIf="selectedOffer" class="col s12 m6 l6">
    
  </div>
</div>
`
})
export class OfferListComponent implements OnDestroy {

  private offers;
  private offerSubscription: Subscription;
  private selectedOffer;

  constructor(private router: Router) {
    this.offerSubscription = MeteorObservable
      .subscribe("points-offers", (<UserData>Meteor.user()).companyId)
      .subscribe();
    this.offers = OfferCollection.find({}).zone();
  }

  private addNewPoint(): void {
    // TODO: implement me
  }

  ngOnDestroy(): void {
    this.offerSubscription.unsubscribe();
  }

  private deleteOffer(offer: Offer) {
    Meteor.call("offer.remove", offer._id);
  }

  editOffer(offer: Offer) {
    this.selectedOffer = offer;
  }
}
