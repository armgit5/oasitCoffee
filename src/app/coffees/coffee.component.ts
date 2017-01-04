import { Component, Input, OnInit } from '@angular/core';
import { coffeesData } from './coffeesData';
import {Coffee} from "./coffee";
import { cartData } from '../cart/cartData';
import { CoffeeService } from './coffee.service';
import { Observable } from "rxjs/Rx";

@Component({
  selector: 'coffee-component',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffees.component.css']
})
export class CoffeeComponent implements OnInit {

    @Input()
    coffee: Coffee;

    coffeeCount = 1;
    cart = cartData.cart;

    constructor(private coffeeService: CoffeeService) {
      
    }

    ngOnInit() {
      
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
