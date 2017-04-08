import { Component } from '@angular/core';
import { coffeesData } from './coffeesData';
import { cartData } from '../cart/cartData';
import { CoffeeService } from './coffee.service';
import { Observable } from "rxjs/Rx";
import { Coffee } from './coffee';
import { Router } from '@angular/router';
// import { CategoryService } from './category/category.service';
import { Category } from './category/category';

@Component({
  selector: 'coffee',
  templateUrl: './coffees.component.html'
})
export class CoffeesComponent {

    coffees: Coffee[];
    filterArg: Category;

    onFilter(filter) {
        this.filterArg = filter;
        console.log("filter arg ", this.filterArg);

    }
    
    constructor(private coffeeService: CoffeeService,
                private router: Router) {
      console.log('calling');
      this.coffeeService.loadAllCoffees().subscribe(
        coffees => this.coffees = coffees
      );
    }

    newCoffee() {
      this.router.navigate(['/coffee/new']);
    }
}
