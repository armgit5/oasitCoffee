import { Component, OnInit } from '@angular/core';
// import { cartData } from './cartData';
import { coffeesData } from '../coffees/coffeesData';
import { CoffeeService } from '../coffees/coffee.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


    cartItems = this.coffeeService.cart;
    total: number;

    constructor(private coffeeService: CoffeeService) {
        
    }

    ngOnInit() {
        this.total = 40.23;
    }
}
