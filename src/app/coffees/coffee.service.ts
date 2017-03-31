
import {Injectable, Inject, EventEmitter} from "@angular/core";
import {Http} from "@angular/http";
import {xhrHeaders} from "./xhr-headers";
import { cartData } from '../cart/cartData';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseRef, FirebaseApp } from 'angularfire2';
import { Coffee } from './coffee';
import { Observable } from 'rxjs';
import { Cart } from '../cart/cart';
import { Subscription } from 'rxjs/Rx';

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

    // coffee upload
    private alreadyUploaded: boolean = false;
    
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



///////////// 

//     private imageStorageInsert(inputImage, $key) {

//     this.alreadyUploaded = false;

//     this.af.database.object('coffees/' + $key)
//         .subscribe(
//       data => {
//         if (!this.alreadyUploaded) {
//             let oldImageKey = data.imageKey;
//             let newImageKey = this.addOneToImageKey(oldImageKey);
//             this.addImageToStorage(inputImage, newImageKey, oldImageKey);
//         }
//       }
//     );

//   // try one shot 

//   //  this.sdkDb.ref(`coffees/${$key}`).once('value').then(function(snapshot) {
//   //     var oldImageKey = snapshot.val().imageKey;
//   //     console.log("old key " + oldImageKey);
//   //     var newImageKey = this.addOneToImageKey(oldImageKey);
//   //     console.log("old key " + oldImageKey);
//   //     // this.addImageToStorage(inputImage, newImageKey, oldImageKey, $key); 
//   //   }
//   //   );

//   }

//   private addOneToImageKey(oldImageKey): string {
//     let newNum = Number(oldImageKey.substr(oldImageKey.length-1)) + 1;
//     let newImageKey = oldImageKey.slice(0, -1) + newNum;
//     return newImageKey;
//     // console.log("add one " + oldImageKey);
//     // return "";
//   }

//   private addImageToStorage(inputImage, newImageKey, oldImageKey) {
//     let image = inputImage.split("base64,");
//     this.firebaseApp.storage().ref().child(this.storageFolderName + newImageKey)
//         .putString(image[1], 'base64').then(snapshot => {
//         // Observe state change events such as progress, pause, and resume
//         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//         let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log('Upload is ' + progress + '% done');
//         switch (snapshot.state) {
//             case firebase.storage.TaskState.PAUSED: // or 'paused'
//             console.log('Upload is paused');
//             break;
//             case firebase.storage.TaskState.RUNNING: // or 'running'
//             console.log('Upload is running');
//             break;
//         }
//         let downloadURL = snapshot.downloadURL;
//         this.imageUrl = downloadURL;
        
//         this.alreadyUploaded = true;
//         console.log("successfully added an image and update key");
        
//         console.log("unsubscribe");

//         // update and delete coffee $key
//         this.updateImageKey(newImageKey);
//         this.deteleImageInStorage(oldImageKey);

//         // this.deteleImageInStorage(oldImageKey);
//     }).catch(error => {
//         // Handle unsuccessful uploads
//         console.log("error uploading: " + error);
//     });
//   }

//   private updateImageKey(newImageKey) {
//      this.af.database.object(`coffees/${this.coffee.$key}`).update({
//         imageKey: newImageKey
//       });
//   }
   
}