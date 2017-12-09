import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoffeePipe } from './coffee.pipe';
import { CoffeeComponent } from './coffee.component';
import { CoffeeEditComponent } from '../coffee-edit/coffee-edit.component';
import { CoffeesComponent } from './coffees.component';
import { CategoryComponent } from './category/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule} from 'ng2-img-cropper';
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
    CoffeeListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    CoffeeRoutingModule,
    ImageCropperModule
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
