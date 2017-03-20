import { Component } from '@angular/core';
import { coffeesData } from './coffeesData';
import { cartData } from '../cart/cartData';
import { CoffeeService } from './coffee.service';
import { Observable } from "rxjs/Rx";
import { Coffee } from './coffee';

@Component({
  selector: 'coffee',
  templateUrl: './coffees.component.html'
})
export class CoffeesComponent {

    coffees: Coffee[];

    filterArg: number;

    onFilter(filter) {
        console.log(filter);
        this.filterArg = filter;
    }
    
    constructor(private coffeeService: CoffeeService) {
      console.log('calling');
      this.coffeeService.loadAllCoffees().subscribe(
        coffees => this.coffees = coffees
      );
    }
}
