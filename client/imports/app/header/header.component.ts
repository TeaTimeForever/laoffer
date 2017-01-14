import { Component } from '@angular/core';

@Component({
  selector: "common-header",
  template: `
<div class="row">
  <nav>
    <login-buttons class="col s6"></login-buttons>
    <a class="col s6" href="/#/profile">profile</a>
  </nav>
</div>
`
})
export class HeaderComponent {
  constructor() {
    Accounts.onLogin(() => console.log("User successfuly logged in"));
  }
}
