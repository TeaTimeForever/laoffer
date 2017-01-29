import { Component, Input } from "@angular/core";
import { Address } from "../../../../../../both/models/address";
import { MouseEvent } from "angular2-google-maps/core";

@Component({
  selector: "address-fieldset",
  template: `    
<div class="row">
  <div class="col s12 m6 l6">
    <div class="row">
      <div class="col s6">
        <label for="country">Country</label>
        <input [(ngModel)]="address.country"
               type="text"
               name="country"
               [disabled]="!editable" />
      </div>
      <div class="col s6">
        <label for="city">City</label>
        <input [(ngModel)]="address.city"
               type="text"
               name="city"
               [disabled]="!editable" >
      </div>
    </div>
    <div class="row">
      <div class="col s12 m6 l6">
        <label for="state">State</label>
        <input [(ngModel)]="address.state"
               type="text"
               name="state"
               [disabled]="!editable" >
      </div>
      <div class="col s12 m6 l6">
        <label for="city">Zip</label>
        <input [(ngModel)]="address.zip"
               type="text"
               name="zip"
               [disabled]="!editable">
      </div>
    </div>
    <div class="row">
      <div class="col s12">
        <label for="street">Street</label>
        <input [(ngModel)]="address.street"
               type="text"
               name="street"
               [disabled]="!editable">
      </div>
    </div>
    <div class="row">
      <div class="col m12 s6 l6">
        <label for="lat">Latitude</label>
        <input [(ngModel)]="address.latitude"
               type="number"
               name="lat"
               [disabled]="!editable"/>
      </div>

      <div class="col m12 s6 l6">
        <label for="lng">Longitude</label>
        <input [(ngModel)]="address.longitude"
               type="number"
               name="lng"
               [disabled]="!editable"/>
      </div>

    </div>
  </div>
  <div class="col s12 m6 l6">
    <sebm-google-map [latitude]="centerLat"
                     [longitude]="centerLng"
                     [zoom]="8"
                     (mapClick)="initPointLocation($event)"
                     style="width: 500px; height: 400px;">
      <sebm-google-map-marker *ngIf="address.latitude && address.longitude"
                              [latitude]="address.latitude"
                              [longitude]="address.longitude"></sebm-google-map-marker>
    </sebm-google-map>
  </div>
</div>
`
})
export class AddressFieldsetComponent {
  @Input()
  private address: Address;

  // TODO: get default lat-lng from device
  centerLat: number = 56.9711614;
  centerLng: number = 23.8500817;

  initPointLocation($event: MouseEvent) {
    this.address.longitude = $event.coords.lng;
    this.address.latitude  = $event.coords.lat;
  }
}
