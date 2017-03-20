import { Component } from '@angular/core';
import { cartData } from './cart/cartData';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';



@Component({
  selector: 'app-root',
  template: `
              <div class="container main">
                <my-header [count]="cartItems.length"></my-header>
                <router-outlet></router-outlet>
              </div>
            `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    courses$ : FirebaseObjectObservable<any>;
    cartItems = cartData.cart;

    constructor(private af: AngularFire) {

    }
}
