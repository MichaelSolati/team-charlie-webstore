import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from '@angular/router';
import { METEOR_PROVIDERS } from 'angular2-meteor';

// Add new components like below
import {TemplateComponent} from './template/template.component'

import { AppComponent } from "./app.component";

import { appRouting, appComponents } from "./app.routes";
import { UserService } from "./shared/services/user.service";

/**
* Declares an NgModule. Declares all dependencies as well as which component to bootstrap.
* @class AppModule
*/
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    appRouting
  ],
  //add new components here
  declarations: [
    AppComponent,
    ...appComponents,
    TemplateComponent
  ],
  providers: [
    METEOR_PROVIDERS,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
