import { Component } from "@angular/core";
import { profileRoutes } from "../user-profile.routes";
import { Router } from "@angular/router";

@Component({
  selector: 'main-profile-view',
  template: `
    <a (click)="goToNewPoint()" href="javascript:void(0)">add new point</a>
    
    <hr>
    
    <a (click)="goToNewOffer()" href="javascript:void(0)">add new offer</a>
`
})
export class InitProfileComponent {
  constructor(private router: Router){}

  goToNewPoint(): void {
    this.router.navigate([profileRoutes.moduleRoot.path, profileRoutes.toNewPoint.path]);
  }

  goToNewOffer(): void {
    this.router.navigate([profileRoutes.moduleRoot.path, profileRoutes.toNewOffer.path]);
  }
}
