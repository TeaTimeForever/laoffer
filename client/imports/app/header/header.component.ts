import { Component } from '@angular/core';

@Component({
  selector: 'common-header',
  template: `
<div class="ui top yellow attached segment">
    <login-buttons></login-buttons>
    
</div>
`
})
export class HeaderComponent {
  constructor() {}
}
