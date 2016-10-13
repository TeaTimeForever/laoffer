import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
<common-header></common-header>

<div class="ui red segment">
    <h1>Hello Angular2-Meteor!</h1>
</div>
 <router-outlet></router-outlet>
<div class="ui blue bottom attached segment">footer</div>
`
})
export class AppComponent {
  constructor() {
  }
}
