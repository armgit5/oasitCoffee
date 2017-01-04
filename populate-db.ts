// import {database, initializeApp} from "firebase";
import { firebaseConfig } from './src/environments/firebase.config';
import { dbData } from "./db-data";
import { AngularFireModule } from 'angularfire2/index';

AngularFireModule.initializeApp(firebaseConfig);
// initializeApp(firebaseConfig);

// var root = database().ref();
// const coffeeRef = database().ref('coffees');



// dbData.coffees.forEach( coffee => {

//   console.log('adding coffee', coffee.name);

//   coffeeRef.push({
//         url: coffee.url,
//         name: coffee.name,
//         category: coffee.category,
//         type: coffee.type,
//         price: coffee.price
//   });


// });
