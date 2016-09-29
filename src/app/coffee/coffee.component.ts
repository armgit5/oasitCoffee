import { Component } from '@angular/core';
import { coffeesData } from './coffeesData';

@Component({
  selector: 'coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css']
})
export class CoffeeComponent {

    coffees = coffeesData.coffees;
    allActive = true;
    coffeeActive = false;
    menuActive = false;
    specialActive = false;
    frappeActive = false;
   
    filterArg = "";
    filterAll() {
        this.filterArg = "";
        this.allActive = true;
        this.coffeeActive = false;
        this.menuActive = false;
        this.specialActive = false;
        this.frappeActive = false;
    }
    filterCoffee() {
        this.filterArg = "coffee";
        this.allActive = false;
        this.coffeeActive = true;
        this.menuActive = false;
        this.specialActive = false;
        this.frappeActive = false;
    }
    filterMenu() {
        this.filterArg = "menu";
        this.allActive = false;
        this.coffeeActive = false;
        this.menuActive = true;
        this.specialActive = false;
        this.frappeActive = false;
    }
    filterSpecialMenu() {
        this.filterArg = "special menu";
        this.allActive = false;
        this.coffeeActive = false;
        this.menuActive = false;
        this.specialActive = true;
        this.frappeActive = false;
    }
    filterFrappe() {
        this.filterArg = "frappe";
        this.allActive = false;
        this.coffeeActive = false;
        this.menuActive = false;
        this.specialActive = false;
        this.frappeActive = true;
    }
}
