import { Component, OnInit } from '@angular/core';
import { cartData } from './cartData';
import { coffeesData } from '../coffees/coffeesData';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


    cartItems = cartData.cart;
    total: number;

    constructor() {
        
    }

    ngOnInit() {
        this.cartItems.forEach(element => {
            console.log(element.comment);
        });
        this.total = 40.23;
    }
}
