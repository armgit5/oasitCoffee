
import {Injectable, Inject} from "@angular/core";
import {Http} from "@angular/http";
import {xhrHeaders} from "./xhr-headers";
import { cartData } from '../cart/cartData';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseRef } from 'angularfire2';

@Injectable()
export class CoffeeService {

    cart = cartData.cart;

    sdkDb: any;
    
    constructor(private http: Http, @Inject(FirebaseRef) fb, private af: AngularFire) {
        this.sdkDb = fb.database().ref();
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

    loadAllCoffees() {
        return this.af.database.list('coffees');
    }
    
}