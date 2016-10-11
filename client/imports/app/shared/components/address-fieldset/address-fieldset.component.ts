import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Point } from "../../../../../../both/models/point";
import { Address } from "../../../../../../both/models/address";

@Component({
  selector: 'address-fieldset',
  template: `
    <input [(ngModel)]="address.country" 
           type="text"
           placeholder="country"> <br>
    <input [(ngModel)]="address.city" 
           type="text"
           placeholder="city"> <br>
    <input [(ngModel)]="address.state" 
           type="text"
           placeholder="state"> <br>
    <input [(ngModel)]="address.zip" 
           type="text"
           placeholder="zip"> <br>
    <input [(ngModel)]="address.street" 
           type="text"
           placeholder="street"> <br>
`
})
export class AddressFieldsetComponent {
  @Input()
  private address: Address;
}
