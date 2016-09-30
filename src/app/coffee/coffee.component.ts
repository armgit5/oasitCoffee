import { Component } from '@angular/core';
import { coffeesData } from './coffeesData';


@Component({
  selector: 'coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css']
})
export class CoffeeComponent {

    coffees = coffeesData.coffees;
    
    filterArg = "";

    onFilter(filter) {
        console.log(filter);
        this.filterArg = filter;
    }

}
