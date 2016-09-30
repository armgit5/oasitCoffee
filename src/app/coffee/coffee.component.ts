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
    removeActive() {
        this.allActive = false;
        this.coffeeActive = false;
        this.menuActive = false;
        this.specialActive = false;
        this.frappeActive = false;
    }
    filterAll() {
        this.filterArg = "";
        this.removeActive();
        this.allActive = true;
    }
    filterCoffee() {
        this.filterArg = "coffee";
        this.removeActive();
        this.coffeeActive = true;   
    }
    filterMenu() {
        this.filterArg = "menu";
        this.removeActive();
        this.menuActive = true;
    }
    filterSpecialMenu() {
        this.filterArg = "special menu";
        this.removeActive();
        this.specialActive = true;
    }
    filterFrappe() {
        this.filterArg = "frappe";
        this.removeActive();
        this.frappeActive = true;
    }
}
