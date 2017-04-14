import { Component, Input, OnInit } from '@angular/core';
import { cartData } from './cart/cartData';
import { CoffeeService } from './coffees/coffee.service';
import { Observable } from "rxjs/Observable";
import { Category } from './coffees/category/category';

@Component({
    selector: 'my-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    // coffeeCounts = cartData.cart.length;
    coffeeCounts: number;
    filterArg: Category;

    @Input()
    count?: number;

    onFilter(filter) {
        this.filterArg = filter;
        // console.log("filter arg ", this.filterArg);
    }

    constructor(private coffeeService: CoffeeService) {
        
    }
    
    ngOnInit() {
        this.coffeeCounts = this.coffeeService.getCoffeeCounts();
        this.coffeeService.coffeeCountsChanged
            .subscribe(coffeeCounts => this.coffeeCounts = coffeeCounts);
    }
    

}   