import { Component } from '@angular/core';
import { coffeesData } from './coffeesData';


@Component({
  selector: 'coffee',
  templateUrl: './coffees.component.html',
  styleUrls: ['./coffees.component.css']
})
export class CoffeesComponent {
    
    coffees = coffeesData.coffees;
    
    filterArg = "";

    onFilter(filter) {
        console.log(filter);
        this.filterArg = filter;
    }

}
