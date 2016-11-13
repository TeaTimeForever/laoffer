import { Component, Input } from "@angular/core";
import { Atom } from "../../../../../both/models/atom";

@Component({
  selector: "atom-label",
  template: `<div style="background-color: beige; display: inline-block; margin: 2px" [attr.data-atomId]="atom._id">
    {{atom.name}}, {{atom.price}}, {{atom.category}} 
</div>`
})
export class AtomLabelComponent {
  @Input()
  private atom: Atom;
}
