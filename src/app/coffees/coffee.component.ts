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

    added: boolean = false;

    coffeeCount = 1;
    cart = cartData.cart;
    comment:string = "";

    constructor(private coffeeService: CoffeeService) {
      
    }

    ngOnInit() {
      
    }

    plus() {
      this.coffeeCount++;
    }

    minus() {
      if (this.coffeeCount > 1) {
        this.coffeeCount--;
      } 
    }

    addCoffeeAlert() {
      this.added = true;
      setTimeout(() => {
        this.added = false;
      }, 1000);
    }

    add() {
      this.addCoffeeAlert();
      this.coffeeService.addToCart(this.coffee, this.coffeeCount, this.comment);

      // this.coffeeService.addCoffeeCounts();
      // this.coffeeService.fetchCounts();
    }
}
