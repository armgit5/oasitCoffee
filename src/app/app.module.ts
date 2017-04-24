import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { routeConfig,navigatableComponents } from "./app.routing";
import { CoffeePipe } from "./coffees/coffee.pipe";
import { HeaderComponent } from "./header.component";
import { CategoryComponent } from './coffees/category/category.component';
import { CoffeeComponent } from './coffees/coffee.component';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig, authConfig } from '../environments/firebase.config';
import { CoffeeService } from './coffees/coffee.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { QueueComponent } from './queue/queue.component';
import { QueueService } from './queue/queue.service';
import { CoffeeEditComponent } from './coffee-edit/coffee-edit.component';
import { ImageCropperComponent } from 'ng2-img-cropper';
import { CategoryService } from './coffees/category/category.service';
import { ModalModule } from 'ngx-bootstrap';
import { AlertModule } from 'ngx-bootstrap/alert';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';

@NgModule({
  declarations: [
    AppComponent,
    ...navigatableComponents,
    CoffeePipe,
    HeaderComponent,
    CategoryComponent,
    CoffeeComponent,
    QueueComponent,
    CoffeeEditComponent,
    ImageCropperComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routeConfig),
    AngularFireModule.initializeApp(firebaseConfig, authConfig),
    ReactiveFormsModule,
    ModalModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [CoffeeService, 
              QueueService, 
              CategoryService,
              LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
