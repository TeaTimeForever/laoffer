import { Component, Input, OnInit } from "@angular/core";
import { categories } from "../../../../../both/models/category.type";
import { Atom } from "../../../../../both/models/atom";
import { AtomCollection } from "../../../../../both/collections/atom.collection";
import ObjectID = Mongo.ObjectID;

@Component({
  selector: "atom-form",
  template: `
    <form>
        <h2>prepare new atom</h2>
        <div>name: 
            <input [(ngModel)]="atom.name" 
                   type="text" 
                   placeholder="some name"
                   name="name"></div>
        <div>price: 
            <input [(ngModel)]="atom.price" 
                   type="number" 
                   placeholder="price"
                   name="price"></div>
        <div>description:
            <textarea [(ngModel)]="atom.description" 
                      name="description" 
                      cols="30" rows="10"></textarea></div>
        <div>category:
            <select [(ngModel)]="atom.category" 
                    name="category">
                <option *ngFor="let category of categories" [value]="category">{{category}}</option>
            </select></div>
         <div>tags:
            <input [(ngModel)]="tags" type="text" placeholder="tag1, tag2" name="tags"></div>
        <button (click)="saveAtom()">save</button>
    </form>
`
})
export class AtomFormComponent {

  @Input()
  private companyId: ObjectID;

  private tags: string;
  private atom: Atom = new Atom();
  private categories;

  constructor() {
    this.categories = categories;
  }

  saveAtom() {
    this.atom.companyId = this.companyId;
    this.atom.tags = this.tags.split(",");
    let a = AtomCollection.insert(this.atom);
    console.log(a);
  }
}
