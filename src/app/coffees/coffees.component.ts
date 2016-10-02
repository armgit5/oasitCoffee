import { Component } from '@angular/core';
import { coffeesData } from './coffeesData';

@Component({
  selector: 'coffee',
  templateUrl: './coffees.component.html'
})
export class CoffeesComponent {

    coffees = coffeesData.coffees;
    
    filterArg: number;

    onFilter(filter) {
        console.log(filter);
        this.filterArg = filter;
    }

}
