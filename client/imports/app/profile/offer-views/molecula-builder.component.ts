import { Component, OnDestroy } from "@angular/core";
import { Point } from "../../../../../both/models/point";
import { Subscription } from "rxjs/Subscription";
import { MeteorObservable } from "meteor-rxjs";
import { UserData } from "../../../../../both/models/user-data";
import { PointCollection } from "../../../../../both/collections/point.collection";
import { Atom } from "../../../../../both/models/atom";
import { Category } from "../../../../../both/models/category.type";
import { DragulaService } from "ng2-dragula/components/dragula.provider";

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

  private atoms: Atom[];
  private molecula;
  private dragSubscription: Subscription;

  constructor(private dragulaService: DragulaService){
    this.dragSubscription = dragulaService.drop.subscribe(value => {
      console.log("drop", value);
      console.log("id", value[1].firstElementChild.firstElementChild.innerText);
    });
    this.molecula = [];
    this.initAtoms();
  }

  ngOnDestroy(): void {
    this.dragSubscription.unsubscribe();
  }

  initAtoms(){
    this.atoms = [{
      _id: "123",
      price: 1.22,
      tags: ["a", "b"],
      category: "Soup",
      name: "soup",
      description: "mmm, yummy"
    },{
      _id: "456",
      price: 1.25,
      tags: ["c", "b"],
      category: "Drink",
      name: "driink",
      description: "mmm, yummy"
    }]
  }

}
