
import {Injectable, Inject, EventEmitter} from "@angular/core";
import {Http} from "@angular/http";
import {xhrHeaders} from "./xhr-headers";
import { cartData } from '../cart/cartData';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseRef } from 'angularfire2';
import { Coffee } from './coffee';
import { Observable } from 'rxjs';

@Injectable()
export class CoffeeService {

    cart = cartData.cart;
    private coffeeCounts:number = 0;
    coffeeCountsChanged = new EventEmitter<number>();
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
        return this.af.database.list('coffees')
                .map(Coffee.fromJsonList);
    }

    addCoffeeCounts() {
        this.coffeeCounts++;
    }

    getCoffeeCounts() {
        return this.coffeeCounts;
    }

    fetchCounts() {
        return this.coffeeCountsChanged.emit(this.coffeeCounts);
    }
    
}