import { Component, OnInit } from '@angular/core';
// import { cartData } from './cartData';
import { coffeesData } from '../coffees/coffeesData';
import { CoffeeService } from '../coffees/coffee.service';
import { element } from 'protractor/globals';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


    cartItems = this.coffeeService.cart;
    total: number = 0;

    constructor(private coffeeService: CoffeeService) {
        
    }

    ngOnInit() {
        this.calculateTotal();
    }

    calculateTotal() {
        this.cartItems.forEach(element => {
            console.log(element.qty, element.price);
            this.total = this.total + element.qty * element.price;
        });
    }

}
