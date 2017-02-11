import { Component, OnDestroy, Input, OnChanges } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { Atom } from "../../../../../both/models/atom";
import { DragulaService } from "ng2-dragula/components/dragula.provider";
import { AtomCollection } from "../../../../../both/collections/atom.collection";
import { MeteorObservable } from "meteor-rxjs";
import { UserData } from "../../../../../both/models/user-data";
import { categories, Category } from "../../../../../both/models/category.type";
import { Molecule } from "../../../../../both/models/molecule";

@Component({
  selector: "molecule-builder",
  template: `    
<div class="row molecule-builder">
  <div class="molecule card teal col m6 l6" dragula="atoms">
    <atom-label *ngFor="let atom of molecule.atoms" [atom]="atom"></atom-label>
    <category-label class="chip" *ngFor="let category of molecule.categories" [category]="category"></category-label>
  </div>
  
  <div class="choices card cyan col m6 l6" dragula="atoms">
      <atom-label *ngFor="let atom of atoms" 
                  [atom]="atom"></atom-label>
      <category-label *ngFor="let category of categories" [category]="category"></category-label>
  </div>
</div>
`
})
export class MoleculeBuilderComponent implements OnChanges, OnDestroy {

  @Input()
  private molecule: Molecule;

  private atoms: Atom[];
  private dragSubscription: Subscription;
  private atomSubscription;
  private categories: Category[];

  constructor(private dragulaService: DragulaService) {
    this.categories = categories;
    this.atomSubscription = MeteorObservable
      .subscribe("company-atoms", (<UserData>Meteor.user()).companyId)
      .subscribe();

    this.dragSubscription = this.dragulaService
      .drop
      .filter(next => next[2].className !== next[3].className)
      .subscribe(next => {
        let dropped: Atom | Category = JSON.parse(next[1].childNodes[0].dataset.item);
        let collection = (typeof dropped === "string") ? "categories" : "atoms";

        if (next[2].className.includes("molecule")) {
          this.molecule[collection].push(dropped);
          this[collection] = this[collection].filter(i => i !== dropped);
        } else {
          this[collection].push(dropped);
          this.molecule[collection] = this.molecule[collection].filter(i => i !== dropped);
        }
      });
  }

  ngOnChanges(changes): void {
    AtomCollection
      .find({_id: { $nin: this.molecule.atoms.map(a => a._id)}})
      .zone()
      .subscribe(next => this.atoms = next);
    this.categories = this.categories.filter(c => this.molecule.categories.indexOf(c) < 0);
  }

  ngOnDestroy(): void {
    this.dragSubscription.unsubscribe();
    this.atomSubscription.unsubscribe();
  }
}
