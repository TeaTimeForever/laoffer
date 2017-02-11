import { Component, Input } from "@angular/core";
import { Category } from "../../../../../both/models/category.type";

@Component({
  selector: "category-label",
  template: `<div class="chip" [attr.data-item]="JSON.stringify(category)">
    {{category}}
</div>`
})
export class CategoryLabelComponent {
  @Input()
  private category: Category;
  private JSON = JSON;
}
