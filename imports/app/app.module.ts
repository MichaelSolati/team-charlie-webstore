import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from '@angular/router';
import { METEOR_PROVIDERS } from 'angular2-meteor';

import { AppComponent } from "./app.component";

import { appRouting, appComponents } from "./app.routes";

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
  declarations: [
    AppComponent,
    ...appComponents
  ],
  providers: [
    METEOR_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
