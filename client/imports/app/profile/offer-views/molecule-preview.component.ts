import { Component, Input } from "@angular/core";
import { Molecule } from "../../../../../both/models/molecule";

@Component({
  selector: "molecule-preview",
  template: `
<span *ngFor="let atom of molecule.atoms">{{atom.name}}</span>
<span *ngFor="let category of molecule.categories">{{category}}</span>

`
})
export class MoleculePreviewComponent {

  @Input()
  private molecule: Molecule;
}
