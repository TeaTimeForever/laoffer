import { Component, OnDestroy, Input } from "@angular/core";
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
  selector: "molecule-builder",
  template: `
<div class="molecule"
     style="background-color: aquamarine; min-height: 100px; min-width: 100px;"
     [dragula]='"atoms"'>
</div>

<div style="background-color: yellowgreen; min-height: 100px; min-width: 100px;"
     [dragula]='"atoms"'>
    <atom-label *ngFor="let atom of atoms | async" 
                [atom]="atom"></atom-label>
    <category-label *ngFor="let category of categories" [category]="category"></category-label>
</div>
`
})
export class MoleculeBuilderComponent implements  OnDestroy {
  @Input()
  private molecule: Molecule;

  private atoms: Observable<Atom[]>;
  private dragSubscription: Subscription;
  private atomSubscription;
  private categories: Category[];

  constructor(private dragulaService: DragulaService){
    this.categories = categories;
    this.atomSubscription = MeteorObservable
      .subscribe("company-atoms", (<UserData>Meteor.user()).companyId)
      .subscribe();
    this.atoms = AtomCollection.find({}).zone();

    this.dragSubscription = dragulaService.drop.subscribe(value => {
      if(value[1].localName.includes("atom-label")) {
        let droppedAtomId = value[1].childNodes[0].dataset.atomid;
        if (value[2].className.includes("molecule")) {
          this.molecule.atoms.push(AtomCollection.findOne({_id: droppedAtomId }));
        } else {
          this.molecule.atoms = this.molecule.atoms.filter((atom: any) => atom._id !== droppedAtomId);
        }
      } else if (value[1].localName.includes("category-label")) {
        let droppedCategory = value[1].childNodes[0].dataset.category;
        if (value[2].className.includes("molecule")) {
          this.molecule.categories.push(droppedCategory);
        } else {
          this.molecule.categories = this.molecule.categories.filter(item => item !== droppedCategory);
        }
      }
      console.log("molecule state", this.molecule);
    });
  }

  ngOnDestroy(): void {
    this.dragSubscription.unsubscribe();
    this.atomSubscription.unsubscribe();
  }
}
