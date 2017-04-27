import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { coffeesData } from './coffeesData';
import { cartData } from '../cart/cartData';
import { CoffeeService } from './coffee.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { Coffee } from './coffee';
import { Router } from '@angular/router';
import { CategoryService } from './category/category.service';
import { Category } from './category/category';
import { CoffeeOutput } from './coffee-output';

@Component({
  selector: 'coffee',
  templateUrl: './coffees.component.html'
})
export class CoffeesComponent {

    coffees: Coffee[];
    filterArg: Category;
    $coffee: Subscription;

    // isNew: boolean = true;
    // inputId: string = "";

    @ViewChild('staticModal') button; 

    onFilter(filter) {
        this.filterArg = filter;
    }
    
    constructor(private coffeeService: CoffeeService,
                private router: Router,
                private categoryService: CategoryService) {
      this.$coffee = this.coffeeService.loadAllCoffees().subscribe(
        coffees => this.coffees = coffees
      );
      this.categoryService.categoryChanged.subscribe(filterArg => {
        this.filterArg = filterArg;
        console.log(filterArg);
      })
    }

    onNgInit() {
      
    }

    newCoffee() {
      // this.router.navigate(['/coffee/new']);
      
      // this.editCoffeeOutput.emit(outputData);
      this.coffeeService.editCoffee(true, "");
      this.button.show();
    }

    onNgDestroy() {
      this.$coffee.unsubscribe();
    }

    hide() {
      this.button.hide();
    }

    hideModal() {
      this.hide();
    }

    onEdit(coffeeOutput) {
      // console.log('edit');
      this.button.show();
    }

    
   
}
