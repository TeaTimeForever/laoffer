import { Component, Input } from "@angular/core";
import { Atom } from "../../../../../both/models/atom";

@Component({
  selector: 'atom-label',
  template: `<span style="background-color: beige">
    {{atom.name}}, {{atom.price}}, {{atom.category}}
</span>`
})
export class AtomLabelComponent {
  @Input()
  private atom: Atom;
}
