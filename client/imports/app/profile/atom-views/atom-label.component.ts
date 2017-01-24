import { Component, Input } from "@angular/core";
import { Atom } from "../../../../../both/models/atom";

@Component({
  selector: "atom-label",
  template: `<div class="chip" [attr.data-atomId]="atom._id">
    {{atom.name}}, {{atom.price}}, {{atom.category}} 
</div>`
})
export class AtomLabelComponent {
  @Input()
  private atom: Atom;
}
