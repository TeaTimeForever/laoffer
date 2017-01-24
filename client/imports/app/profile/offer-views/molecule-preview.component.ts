import { Component, OnDestroy, Input, OnInit, OnChanges } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { Atom } from "../../../../../both/models/atom";
import { DragulaService } from "ng2-dragula/components/dragula.provider";
import { AtomCollection } from "../../../../../both/collections/atom.collection";
import { MeteorObservable } from "meteor-rxjs";
import { UserData } from "../../../../../both/models/user-data";
import { Observable } from "rxjs";
import { categories, Category } from "../../../../../both/models/category.type";
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
