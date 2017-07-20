
import { Component } from '@angular/core';
import { cartData } from './cart/cartData';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
              <div [ngClass]="{'container': !isAdmin, 'main': !isAdmin}" >
                <my-header *ngIf="!isAdmin" [count]="cartItems.length" #myHeader></my-header>
                <router-outlet></router-outlet>
              </div>

            `,
  styleUrls: ['./app.component.css']

})
export class AppComponent {

  isAdmin: boolean = false;

  cartItems = cartData.cart;

  constructor(private  router : Router) {

    // Control container class and header
    // Admin page shouldn't have class and header
    router.events.subscribe(
      (val: NavigationEnd) => {
        // console.log("1 " + (val.url=="/admin"));
        if (val.url == "/admin") {
          this.isAdmin = true;
          // console.log("isAdmin " + this.isAdmin);
        } else {
          this.isAdmin = false;
          // console.log("isAdmin " + this.isAdmin);
        }
      }
    );
  }
}
