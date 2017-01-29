import { Component, Input } from "@angular/core";
import { Address } from "../../../../../../both/models/address";

@Component({
  selector: "address-fieldset",
  template: `
<div class="row">
  <div class="col s6">
    <label for="country">Country</label>
    <input [(ngModel)]="address.country" 
           type="text"
           placeholder="country"
           name="country"
           [disabled]="!editable" />
  </div>
  <div class="col s6">
    <label for="city">City</label>
    <input [(ngModel)]="address.city" 
         type="text"
         placeholder="city"
         name="city"
         [disabled]="!editable" >
  </div>
</div>
<div class="row">
  <div class="col s6">
    <label for="state">State</label>
    <input [(ngModel)]="address.state" 
           type="text"
           placeholder="state"
           name="state"
           [disabled]="!editable" >
  </div>
  <div class="col s6">
    <label for="city">City</label>
    <input [(ngModel)]="address.zip" 
           type="text"
           placeholder="zip"
           name="zip"
           [disabled]="!editable">
  </div>
</div>
<div class="row">
  <div class="col s12">
    <label for="street">Street</label>
    <input [(ngModel)]="address.street" 
           type="text"
           placeholder="street"
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
           placeholder="latitude"
           [disabled]="!editable"/>
  </div>

  <div class="col m12 s6 l6">
    <label for="lng">Longitude</label>
    <input [(ngModel)]="address.longitude"
           type="number"
           name="lng"
           placeholder="longitude"
           [disabled]="!editable"/>
  </div>
</div>
`
})
export class AddressFieldsetComponent {
  @Input()
  private address: Address;
}
