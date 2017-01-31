import { Component, OnDestroy, Input, OnChanges } from "@angular/core";
import { MeteorObservable } from "meteor-rxjs";
import { Subscription } from "rxjs/Subscription";
import { OfferCollection } from "../../../../both/collections/offer.collection";
import { Observable } from "rxjs";
import { Offer } from "../../../../both/models/offer";
import { Point } from "../../../../both/models/point";
import ObjectID = Mongo.ObjectID;

@Component({
  selector: "point-details",
  template: `
    <div class="container">
        <h5 *ngIf="point">{{point.name}}</h5>
        {{point.phone}}
    </div>
`
})
export class PointDetailsComponent {

  @Input()
  point: Point;
}
