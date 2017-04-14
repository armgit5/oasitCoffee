import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { cartData } from './cart/cartData';
import { CoffeeService } from './coffees/coffee.service';
import { Observable } from "rxjs/Observable";
import { Category } from './coffees/category/category';
import { CategoryService } from './coffees/category/category.service';

@Component({
    selector: 'my-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    // coffeeCounts = cartData.cart.length;
    coffeeCounts: number;;
    clicked: boolean = false;

    @Input()
    count?: number;

    onFilter(filter) {
        this.categorySerivce.categoryChanged.emit(filter);
    }

    constructor(private coffeeService: CoffeeService,
                private categorySerivce: CategoryService) {
        
    }
    
    ngOnInit() {
        this.coffeeCounts = this.coffeeService.getCoffeeCounts();
        this.coffeeService.coffeeCountsChanged
            .subscribe(coffeeCounts => this.coffeeCounts = coffeeCounts);
    }

    openNav() {
        if (!this.clicked) {
            document.getElementById("mySidenav").style.width = "17%";
            document.getElementById("mySidenav").style.paddingLeft = "4%";
            document.getElementById("mySidenav").style.paddingRight = "4%";
            this.clicked = true;
        } else {
            document.getElementById("mySidenav").style.width = "0";
             document.getElementById("mySidenav").style.paddingLeft = "0%";
            document.getElementById("mySidenav").style.paddingRight = "0%";
            this.clicked = false;
        }  
    }

    out() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("mySidenav").style.paddingLeft = "0%";
        document.getElementById("mySidenav").style.paddingRight = "0%";
        this.clicked = false;
    }

}   