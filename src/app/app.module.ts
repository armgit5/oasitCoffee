import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { routeConfig,navigatableComponents } from "./app.routing";
import { CoffeePipe } from "./coffees/coffee.pipe";
import { HeaderComponent } from "./header.component";
import { CategoryComponent } from './coffees/category/category.component';
import { CoffeeComponent } from './coffees/coffee.component';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    ...navigatableComponents,
    CoffeePipe,
    HeaderComponent,
    CategoryComponent,
    CoffeeComponent
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
