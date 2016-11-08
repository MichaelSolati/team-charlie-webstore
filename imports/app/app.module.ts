import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from '@angular/router';
import { METEOR_PROVIDERS } from 'angular2-meteor';

import { ShippingAddressComponent } from './shippingAddress/shippingAddress.component';

// Add new components like below
import {TemplateComponent} from './template/template.component'

import { Ng2PaginationModule } from 'ng2-pagination';

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
    appRouting,
    Ng2PaginationModule
  ],
  //add new components here
  declarations: [
    AppComponent,
    ...appComponents,
    TemplateComponent,
    ShippingAddressComponent
  ],
  providers: [
    METEOR_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
