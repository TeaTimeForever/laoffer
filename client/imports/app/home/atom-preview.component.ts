import { Component, Input } from "@angular/core";
import { Atom } from "../../../../both/models/atom";

@Component({
  selector: "atom-preview",
  template: `
    <div>{{atom.name}} 
      <span *ngIf="atom.tags && atom.tags.length > 0">(
        <span *ngFor="let tag of atom.tags">{{tag}}</span>
      )</span> 
    </div>
`
})
export class AtomPreviewComponent {
  @Input()
  private atom: Atom;
}
