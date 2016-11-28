import { Component } from "@angular/core";

@Component({
  selector: "app-admin-outlet",
  template: `
  <app-admin-navbar></app-admin-navbar>
  <router-outlet></router-outlet>
  `,
})
export class AdminOutletComponent {
  constructor () { }
}
