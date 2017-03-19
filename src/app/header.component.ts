import { Component, Input, OnInit } from '@angular/core';
import { cartData } from './cart/cartData';
import { CoffeeService } from './coffees/coffee.service';
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'my-header',
    templateUrl: './header.component.html',
    styles: [`
        header {
        }
    
        ul {
          text-align: center;  
        }
        
        li {
            float: none;
            display: inline-block;
        }
        
        .router-link-active {
            background-color: #337ab7;
            color: white;
        }
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