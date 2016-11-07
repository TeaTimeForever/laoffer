import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { Atom } from "../../../../../both/models/atom";
import { DragulaService } from "ng2-dragula/components/dragula.provider";
import { AtomCollection } from "../../../../../both/collections/atom.collection";
import { MeteorObservable } from "meteor-rxjs";
import { UserData } from "../../../../../both/models/user-data";
import { Observable } from "rxjs";

@Component({
  selector: 'molecula-builder',
  template: `
<div class="molecula"
     style="background-color: aquamarine; min-height: 100px; min-width: 100px;"
     [dragula]='"atoms"' >
     <atom-label *ngFor="let atom of molecula"></atom-label>
</div>

<div style="background-color: yellowgreen; min-height: 100px; min-width: 100px;"
     [dragula]='"atoms"'>
    <atom-label *ngFor="let atom of atoms" 
                [atom]="atom"></atom-label>
</div>
`
})
export class MoleculaBuilderComponent implements  OnDestroy {

  private atoms: Observable<Atom[]>;
  private molecula;
  private dragSubscription: Subscription;
  private atomSubscription;

  constructor(private dragulaService: DragulaService){
    this.dragSubscription = dragulaService.drop.subscribe(value => {
      console.log("drop", value);
      console.log("id", value[1].firstElementChild.firstElementChild.innerText);
    });
    this.molecula = [];
    this.atomSubscription = MeteorObservable
      .subscribe("company-atoms", (<UserData>Meteor.user()).companyId)
      .subscribe();
    this.atoms = AtomCollection.find({}).zone();
  }

  ngOnDestroy(): void {
    this.dragSubscription.unsubscribe();
  }
}
