import * as firebase from 'firebase';

import {Injectable, Inject, EventEmitter} from "@angular/core";
import {Http} from "@angular/http";
import {xhrHeaders} from "./xhr-headers";
import { cartData } from '../cart/cartData';
import { AngularFireDatabase } from 'angularfire2/database';
import { Coffee } from './coffee';
import { Observable } from 'rxjs';
import { Cart } from '../cart/cart';
import { Subscription } from 'rxjs/Rx';
import { CoffeeOutput } from './coffee-output';
import { apiMethods } from '../../environments/environment';
import { LoginService } from '../login/login.service';
import { User } from '../login/user';

@Injectable()
export class CoffeeService {

    // coffee variables
    cartCoffees: Cart[] = [];
    private coffeeCounts:number = 0;
    coffeeCountsChanged = new EventEmitter<number>();

    outputData = new CoffeeOutput(true, "");
    editCoffeeData = new EventEmitter<CoffeeOutput>();

    // firebase viriables
    private storageFolderName: string = "images/";

    // coffee upload
    private alreadyUploaded: boolean = false;


    constructor(private http: Http,
                private db: AngularFireDatabase,
                private loginService: LoginService) {
        loginService.userOutput.subscribe(
          (user: User) => console.log("new user :" + user.email + " " + user.companyName)
        );
    }

    addToCart(coffee, count, comment) {
        let alreadyInCart = false;
        // this.coffeeCounts = count;
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
                comment: comment,
                imageUrl: coffee.url
            });
        }

        this.fetchCounts(count);
    }

    loadAllCoffees() {
        if (apiMethods.v1) {
          return this.db.list('coffees')
                .map(Coffee.fromJsonList);
        }

    }

    loadCoffee($key) {
      if (apiMethods.v1) {
        return this.db.object(`coffees/${$key}`);
      }
    }

    deleteCoffee($key) {

      if (apiMethods.v1) {
        // get coffee image key
        firebase.database().ref(`coffees/${$key}`).once('value').then(snapshot => {
            let imageKey = snapshot.val().imageKey;

            // removing the coffee
            this.db.object(`coffees/${$key}`).remove()
            .then(() => {

                // deleting image in storage
                this.deteleImageInStorage(imageKey);
            })
            .catch(error => console.log("Error"));
        });
      }

    }

    private deteleImageInStorage(imageKey) {
        firebase.storage().ref().child(this.storageFolderName + imageKey)
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

    fetchCounts(count: number) {
        this.coffeeCounts = this.coffeeCounts + count;
        // console.log(this.coffeeCounts);
        return this.coffeeCountsChanged.emit(this.coffeeCounts);
    }

    // update and fetch counts when qty changes in cart
    updateFetchCounts(newCount) {
        this.coffeeCounts = newCount;
        this.fetchCounts(0);
    }

    editCoffee(isNew, inputId) {
        this.outputData.isNew = isNew;
        this.outputData.coffeeId = inputId;
        this.editCoffeeData.emit(this.outputData);
    }
}
