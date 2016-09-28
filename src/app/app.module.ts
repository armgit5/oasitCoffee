import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from "@angular/router";
import {routeConfig,navigatableComponents} from "./app.routing";

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    ...navigatableComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routeConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
