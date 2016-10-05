import { Component } from '@angular/core';
import { coffeesData } from './coffeesData';
import { cartData } from '../cart/cartData';

@Component({
  selector: 'coffee',
  templateUrl: './coffees.component.html'
})
export class CoffeesComponent {

    coffees = coffeesData.coffees;
    cartItems = cartData.cart;

    filterArg: number;

    onFilter(filter) {
        console.log(filter);
        this.filterArg = filter;
    }

}
