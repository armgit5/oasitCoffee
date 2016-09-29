import { Component } from '@angular/core';
import { coffeesData } from './coffeesData';

@Component({
  selector: 'coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css']
})
export class CoffeeComponent {

    coffees = coffeesData.coffees;

    filter = 0;
    filterCoffee() {
        this.filter = 1;
    }
}
