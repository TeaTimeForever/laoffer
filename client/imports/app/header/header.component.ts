import { Component } from '@angular/core';

@Component({
  selector: "common-header",
  template: `
<div class="row">
  <nav>
    <login-buttons class="col s3"></login-buttons>
    <a class="col s3" href="/#/profile">profile</a>
    <a class="col s3" href="/#/profile/offer-list">offers</a>
  </nav>
</div>
`
})
export class HeaderComponent {
  constructor() {
    Accounts.onLogin(() => console.log("User successfuly logged in"));
  }
}
