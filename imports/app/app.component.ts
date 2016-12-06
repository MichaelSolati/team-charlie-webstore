import { Component } from "@angular/core";
import { UserService } from "./shared/services/user.service";

@Component({
  selector: "app",
  template: `<router-outlet></router-outlet>`,
  providers: [UserService]
})
export class AppComponent {
  constructor (private user: UserService) { }
}
