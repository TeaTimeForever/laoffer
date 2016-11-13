import { Component, Input } from "@angular/core";
import { Category } from "../../../../../both/models/category.type";

@Component({
  selector: "category-label",
  template: `<div style="background-color: darkgoldenrod; display: inline-block; margin: 2px" [attr.data-category]="category">
    {{category}}
</div>`
})
export class CategoryLabelComponent {
  @Input()
  private category: Category;
}
