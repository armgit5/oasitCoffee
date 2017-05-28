import { Component } from '@angular/core';
import { cartData } from './cart/cartData';


@Component({
  selector: 'app-root',
  template: `
              <div class="container main">
                <my-header [count]="cartItems.length" #myHeader></my-header>
                <router-outlet></router-outlet>
              </div>
             
            `,
  styleUrls: ['./app.component.css']

})
export class AppComponent {

    cartItems = cartData.cart;

    constructor() {
    
    }
}
