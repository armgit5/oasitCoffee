import { Component } from '@angular/core';
import { coffeesData } from './coffeesData';
import { cartData } from '../cart/cartData';
import { CoffeeService } from './coffee.service';
import { Observable } from "rxjs/Rx";

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
    
    constructor(private coffeeService: CoffeeService) {
      console.log('calling');
      this.coffeeService.loadAllCoffees().subscribe(
        coffees => console.log(coffees)
      );
    }
}
