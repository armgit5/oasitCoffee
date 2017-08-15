import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import { cartData } from './cart/cartData';

@Injectable()
export class CoffeeService {

    cart = cartData.cart;
    
    constructor(private http: Http) {
    }

    updateCart() {
        return this.cart.length;
    }
    
}