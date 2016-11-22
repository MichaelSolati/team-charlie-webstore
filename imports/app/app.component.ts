import { Component } from "@angular/core";
import { UserService } from "./shared/services/user.service";

/**
* Our main App component.
* @class AppComponent
* @constructor
*/
@Component({
  selector: "app",
  template: `<router-outlet></router-outlet>`,
  providers: [UserService]
})
export class AppComponent {
  /**
  * @method constructor
  */
  constructor (private user: UserService) {
    //Bert.alert( "Team Charlie; we spit hot 🔥🔥🔥", 'success', 'growl-top-right' );
  }
}
