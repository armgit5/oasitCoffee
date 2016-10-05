import { Component, Input} from '@angular/core';
import { coffeesData } from './coffeesData';
import {Coffee} from "./coffee";
import { cartData } from '../cart/cartData';
import { CoffeeService } from './coffee.service';

@Component({
  selector: 'coffee-component',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffees.component.css'],
  providers: [CoffeeService]
})
export class CoffeeComponent {

    @Input()
    coffee: Coffee;

    coffeeCount = 1;
    cart = cartData.cart;

    constructor(private coffeeService: CoffeeService) {

    }

    plus() {
      console.log("plus");
      this.coffeeCount++;
    }

    minus() {
      console.log("minus");
      if (this.coffeeCount > 1) {
        this.coffeeCount--;
      } 
    }

    add() {
      this.coffeeService.addToCart(this.coffee.id);
    }
}
