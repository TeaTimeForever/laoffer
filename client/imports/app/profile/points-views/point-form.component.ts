import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Point } from "../../../../../both/models/point";
import { Address } from "../../../../../both/models/address";
import { PointCollection } from "../../../../../both/collections/point.collection";
import { profileRoutes } from "../user-profile.routes";
import { MouseEvent } from "angular2-google-maps/core";
import ObjectID = Mongo.ObjectID;

@Component({
  selector: "point-form",
  template: `
    <h3>Please add info about your new point</h3>
    <form (submit)="savePoint()">
      <address-fieldset [address]="point.address"></address-fieldset>
<div class="row">
  <div class="col s6">
    <div class="row">
      <div class="col s6">
        <label for="phone">Phone</label>
        <input [(ngModel)]="point.phone"
                   type="text"
                   name="phone"
                   placeholder="phone"
                   [disabled]="!editable"
                    />
      </div>
      <div class="col s6">
        <label for="name">Name</label>
        <input [(ngModel)]="point.name"
               type="text"
               name="name"
               placeholder="name" />
      </div>
    </div>
    <div class="row">
      <div class="col m12 s6 l6">
        <label for="lat">Latitude</label>
        <input [(ngModel)]="point.geoLocation.lat"
               type="number"
               name="lat"
               placeholder="lat" 
               [disabled]="!editable"/>
      </div>
      
      <div class="col m12 s6 l6">
        <label for="lng">Longitude</label>
        <input [(ngModel)]="point.geoLocation.lng"
               type="number"
               name="lng"
               placeholder="lng"
               [disabled]="!editable"/>
      </div>
    </div>
  </div>
  <div class="col s6">
    <sebm-google-map [latitude]="centerLat"
                         [longitude]="centerLng"
                         [zoom]="8"
                         (mapClick)="initPointLocation($event)"
                         style="width: 500px; height: 500px;">
            <sebm-google-map-marker *ngIf="point.geoLocation.lat && point.geoLocation.lng"
                [latitude]="point.geoLocation.lat"
                [longitude]="point.geoLocation.lng"></sebm-google-map-marker>
        </sebm-google-map>
  </div>
</div>
       
        
        
    </form>
    <button (click)="savePoint()" >save</button>
    <button (click)="goToProfile()" >go back</button>
`
})
export class PointFormComponent implements OnInit {
  @Input()
  private point: Point;

  private editable;

  // TODO: get default lat-lng from device
  centerLat: number = 56.9711614;
  centerLng: number = 23.8500817;

  constructor(private router: Router){}

  ngOnInit(): void {
    this.editable = !this.point._id;
    console.log("LOADED POINT", this.point);
  }

  initPointLocation($event: MouseEvent) {
    this.point.geoLocation = $event.coords;
  }

  savePoint(): void {
    console.log("submit processing");
    if (!Meteor.userId()) {
      alert("please login");
    } else {
      console.log("POINT ON SUBMIT", this.point);

      // TODO: use upsert instead of this shit
      if (this.point._id) {
        PointCollection.update(this.point._id, {$set: {
          name: this.point.name,
          address: this.point.address,
          geoLocation: this.point.geoLocation,
          phone: this.point.phone
        }});
      } else {
        PointCollection.insert(this.point);
      }
      this.goToProfile();
    }
  }

  goToProfile() {
    this.router.navigateByUrl(profileRoutes.moduleRoot.path);
  }
}
