import { Component, OnInit, OnDestroy } from '@angular/core';
import { coffeesData } from './coffeesData';
import { cartData } from '../cart/cartData';
import { CoffeeService } from './coffee.service';
import { Observable, Subscription } from 'rxjs/Rx';
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
    $coffee: Subscription;

    onFilter(filter) {
        this.filterArg = filter;
        console.log("filter arg ", this.filterArg);

    }
    
    constructor(private coffeeService: CoffeeService,
                private router: Router) {
      this.$coffee = this.coffeeService.loadAllCoffees().subscribe(
        coffees => this.coffees = coffees
      );
    }

    onNgInit() {
      
    }

    newCoffee() {
      this.router.navigate(['/coffee/new']);
    }

    onNgDestroy() {
      this.$coffee.unsubscribe();
    }
}
