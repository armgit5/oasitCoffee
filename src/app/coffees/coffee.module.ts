import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoffeePipe } from './coffee.pipe';
import { CoffeeComponent } from './coffee.component';
import { CoffeeEditComponent } from '../coffee-edit/coffee-edit.component';
import { CoffeesComponent } from './coffees.component';
import { CategoryComponent } from './category/category.component';
import { RouterModule } from '@angular/router';
import { routeConfig } from '../app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Coffee } from './coffee';
import { ImageCropperComponent } from 'ng2-img-cropper';
import { ModalModule } from 'ngx-bootstrap';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CoffeeRoutingModule } from './coffee-routing.module';
import { CoffeeListComponent } from './coffee-list/coffee-list.component';


@NgModule ({
  declarations: [
    CoffeePipe,
    CoffeeComponent,
    CoffeeEditComponent,
    CoffeesComponent,
    CategoryComponent,
    ImageCropperComponent,
    CoffeeListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    CoffeeRoutingModule
  ],
  exports: [
    CoffeePipe,
    ReactiveFormsModule,
    ModalModule,
    AlertModule,
    CategoryComponent,
    CoffeeComponent,
    CoffeeListComponent
  ]
})

export class CoffeeModule {

}
