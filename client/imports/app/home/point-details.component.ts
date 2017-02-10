import { Component, Input } from "@angular/core";
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
