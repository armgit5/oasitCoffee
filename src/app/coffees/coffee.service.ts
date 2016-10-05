
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {xhrHeaders} from "./xhr-headers";
import { cartData } from '../cart/cartData';

@Injectable()
export class CoffeeService {

    cart = cartData.cart;
    
    constructor(private http: Http) {
    }

    addToCart(coffeeId) {
        console.log("add");
        this.cart.push({
            id:9,
            coffeeId: coffeeId,
            qty: 9,
            comment: "add less sugar test..."
        });
        return this.cart.length;
    }
    
}