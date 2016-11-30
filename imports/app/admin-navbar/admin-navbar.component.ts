import { Component } from "@angular/core";
import template from "./admin-navbar.component.html";

@Component({
  selector: "app-admin-navbar",
  template: template
})
export class AdminNavbarComponent {
  private showDrop: boolean = false;
  constructor () { }

  private toggleNav() {
    this.showDrop = !this.showDrop;
  }
}
