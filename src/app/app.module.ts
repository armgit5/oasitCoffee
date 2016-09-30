import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { routeConfig,navigatableComponents } from "./app.routing";
import { CoffeePipe } from "./coffee/coffee.pipe";
import { HeaderComponent } from "./header.component";
import { CategoryComponent } from './coffee/category.component';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    ...navigatableComponents,
    CoffeePipe,
    HeaderComponent,
    CategoryComponent
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
