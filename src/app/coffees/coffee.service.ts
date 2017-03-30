
import {Injectable, Inject, EventEmitter} from "@angular/core";
import {Http} from "@angular/http";
import {xhrHeaders} from "./xhr-headers";
import { cartData } from '../cart/cartData';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseRef, FirebaseApp } from 'angularfire2';
import { Coffee } from './coffee';
import { Observable } from 'rxjs';
import { Cart } from '../cart/cart';

@Injectable()
export class CoffeeService {

    // cart = cartData.cart;
    // coffee variables
    cartCoffees: Cart[] = [];
    private coffeeCounts:number = 0;
    coffeeCountsChanged = new EventEmitter<number>();

    // firebase viriables
    sdkDb: any;
    firebaseApp: any;
    storageRef: any;
    private storageFolderName: string = "images/";
    
    constructor(private http: Http, 
                @Inject(FirebaseRef) fb, 
                private af: AngularFire,
                @Inject(FirebaseApp) firebaseApp: any
                ) {
        this.sdkDb = fb.database();
        this.firebaseApp = firebaseApp;
    }

    addToCart(coffee, count, comment) {
        let alreadyInCart = false;

        // Check to see if this coffee is already added
        // this.cart.forEach(cartCoffee => {
        //     if (coffee.$key == cartCoffee.coffeeId) {
        //          cartCoffee.qty += count;
        //          cartCoffee.comment = comment;
        //          alreadyInCart = true;
        //     } 
        // });

        if (!alreadyInCart) {
            this.cartCoffees.push({
                coffeeId: coffee.$key,
                coffeeName: coffee.name,
                coffeeType: coffee.type,
                qty: count,
                price: coffee.price,
                comment: comment
            });
        }
        
        this.fetchCounts(count);
    }

    loadAllCoffees() {
        return this.af.database.list('coffees')
                .map(Coffee.fromJsonList);
    }

    loadCoffee($key) {
        return this.af.database.object(`coffees/${$key}`); 
    }

    deleteCoffee($key) {

        // get coffee image key
        this.sdkDb.ref(`coffees/${$key}`).once('value').then(snapshot => {
            let imageKey = snapshot.val().imageKey;

            // removing the coffee
            this.af.database.object(`coffees/${$key}`).remove()
            .then(() => {

                // deleting image in storage
                this.deteleImageInStorage(imageKey);
            })
            .catch(error => console.log("Error"));
        });

        
    }

    private deteleImageInStorage(imageKey) {
        this.firebaseApp.storage().ref().child(this.storageFolderName + imageKey)
        .delete().then(function() {
            // File deleted successfully
            console.log("successfully deleted the image");
        }).catch(function(error) {
            // Uh-oh, an error occurred!
            console.log("error deleting the image");
        });
        console.log("delete image in storage " + imageKey);
    }

    getCoffeeCounts() {
        return this.coffeeCounts;
    }

    fetchCounts(count) {
        this.coffeeCounts = this.coffeeCounts + count;
        return this.coffeeCountsChanged.emit(this.coffeeCounts);
    }

    // update and fetch counts when qty changes in cart
    updateFetchCounts(newCount) {
        this.coffeeCounts = newCount;
        this.fetchCounts(0);
    }

   
}