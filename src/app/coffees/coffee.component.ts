import { Component, Input } from '@angular/core';
import { coffeesData } from './coffeesData';
import {Coffee} from "./coffee";

@Component({
  selector: 'coffee-component',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffees.component.css']
})
export class CoffeeComponent {

    @Input()
    coffee: Coffee;
    
    coffeeCount = 2;

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
}
