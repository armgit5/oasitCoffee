
import {Injectable, Inject, EventEmitter} from "@angular/core";
import {Http} from "@angular/http";
import {xhrHeaders} from "./xhr-headers";
import { cartData } from '../cart/cartData';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseRef } from 'angularfire2';
import { Coffee } from './coffee';
import { Observable } from 'rxjs';
import { Cart } from '../cart/cart';

@Injectable()
export class CoffeeService {

    // cart = cartData.cart;
    cart: Cart[] = [];
    private coffeeCounts:number = 0;
    coffeeCountsChanged = new EventEmitter<number>();
    sdkDb: any;
    
    constructor(private http: Http, @Inject(FirebaseRef) fb, private af: AngularFire) {
        this.sdkDb = fb.database().ref();
    }

    addToCart(coffee, count, comment) {
        this.cart.push({
            coffeeName: coffee.name,
            coffeeType: coffee.type,
            qty: count,
            price: coffee.price,
            comment: comment
        });
        console.log(this.cart);
        
        this.fetchCounts(count);
    }

    loadAllCoffees() {
        return this.af.database.list('coffees')
                .map(Coffee.fromJsonList);
    }

    getCoffeeCounts() {
        return this.coffeeCounts;
    }

    fetchCounts(count) {
        this.coffeeCounts = this.coffeeCounts + count;
        return this.coffeeCountsChanged.emit(this.coffeeCounts);
    }
    
}