import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from "@angular/router";
import { routeConfig,navigatableComponents } from "./app.routing";
import { CoffeePipe } from "./coffees/coffee.pipe";
import { HeaderComponent } from "./header.component";
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../environments/firebase.config';
import { CoffeeService } from './coffees/coffee.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { QueueComponent } from './queue/queue.component';
import { QueueService } from './queue/queue.service';
import { CategoryService } from './coffees/category/category.service';
import { ModalModule } from 'ngx-bootstrap';
import { AlertModule } from 'ngx-bootstrap/alert';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { CoffeeModule } from './coffees/coffee.module';
import { UsersService } from './admin/users/users.service';
import { HeaderService } from './header.service';
import { DashboardService } from './admin/dashboard/dashboard.service';

@NgModule({
  declarations: [
    AppComponent,
    ...navigatableComponents,
    HeaderComponent,
    QueueComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routeConfig, {preloadingStrategy: PreloadAllModules}),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CoffeeModule,
    ModalModule.forRoot()
    // AdminModule
  ],
  providers: [CoffeeService,
              QueueService,
              CategoryService,
              LoginService,
              UsersService,
              HeaderService,
              DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
