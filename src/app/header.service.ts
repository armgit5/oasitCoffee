import { Injectable, EventEmitter } from '@angular/core';
import {Http} from "@angular/http";
import { cartData } from './cart/cartData';

@Injectable()
export class HeaderService {

    cart = cartData.cart;

    searchValOutput = new EventEmitter<string>();

    constructor(private http: Http) {
    }

    updateCart() {
        return this.cart.length;
    }

    searchVal(searchVal: string) {
      this.searchValOutput.emit(searchVal);
    }

}
