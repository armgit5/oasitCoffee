import { Component, Input, OnInit } from '@angular/core';
import { cartData } from './cart/cartData';
import { CoffeeService } from './coffees/coffee.service';
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'my-header',
    templateUrl: './header.component.html',
    styles: [`
        
        
    `]
})
export class HeaderComponent implements OnInit {
    // coffeeCounts = cartData.cart.length;
    coffeeCounts: number;

    @Input()
    count?: number;

    constructor(private coffeeService: CoffeeService) {
        
    }
    
    ngOnInit() {
        this.coffeeCounts = this.coffeeService.getCoffeeCounts();
        this.coffeeService.coffeeCountsChanged
            .subscribe(coffeeCounts => this.coffeeCounts = coffeeCounts);
    }
    

}   