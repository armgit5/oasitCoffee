var firebase = require('firebase');
var dbData = require("./db-data");
var app = firebase.initializeApp({
   
});

var coffeeRef = firebase.database().ref('coffees');
var cartRef = firebase.database().ref('cart');
var categoriesRef = firebase.database().ref('categories');
var typesRef = firebase.database().ref('types');

// dbData.coffees.forEach(function (coffee) {
//     console.log('adding coffee', coffee.name);
//     let coffeeKey = coffeeRef.push({
//         url: coffee.url,
//         name: coffee.name,
//         category: coffee.category,
//         type: coffee.type,
//         price: coffee.price
//     }).key;

//     console.log(coffeeKey);

//     if (coffee.cart) {
//         cartRef.push({
//             coffeeId: coffeeKey,
//             qty: coffee.cart.qty,
//             comment: coffee.cart.comment
//         });
//     }
// });

// dbData.categories.forEach(function (category) {
//     console.log('adding category', category.name);
//     categoriesRef.push({
//         name: category.name
//     });
// });

dbData.types.forEach(function (type) {
    console.log('adding type', type.name);
    typesRef.push({
        name: type.name
    });
});