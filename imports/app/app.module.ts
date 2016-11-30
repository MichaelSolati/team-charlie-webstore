import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from '@angular/router';
import { METEOR_PROVIDERS } from 'angular2-meteor';

import { AppComponent } from "./app.component";

import { appRouting, appComponents } from "./app.routes";
import { CategoryPipe } from "/imports/app/shared/pipes/category.pipe";
import { UserService } from "/imports/app/shared/services/user.service";
import { ActivateGuard } from "/imports/app/shared/services/activate.service";
import { AdminGuard } from "/imports/app/shared/services/admin.service";
import { DeactivateGuard } from "/imports/app/shared/services/deactivate.service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    appRouting
  ],
  declarations: [
    AppComponent,
    CategoryPipe,
    ...appComponents
  ],
  providers: [
    METEOR_PROVIDERS,
    UserService,
    ActivateGuard,
    AdminGuard,
    DeactivateGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
