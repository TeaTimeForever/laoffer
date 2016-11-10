import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
  <header><common-header></common-header></header>
  <main>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  </main>
  <footer class="page-footer">Here will be fancy footer</footer>
`
})
export class AppComponent {}
