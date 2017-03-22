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
    total: number;

    constructor(private coffeeService: CoffeeService) {
        
    }

    ngOnInit() {
        this.calculateTotal();
    }

    calculateTotal() {
        this.total = 0;
        this.cartItems.forEach(element => {
            console.log(element.qty, element.price);
            this.total = this.total + element.qty * element.price;
        });
    }

    update() {

    }

    delete(cartItem) {
        this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
        this.calculateTotal();
    }

}
