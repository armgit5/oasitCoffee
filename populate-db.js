var firebase = require('firebase');
var dbData = require("./db-data");
var app = firebase.initializeApp({
    apiKey: "AIzaSyC2-Bt2eP64CxHbztz6YLomHHz0PkvzYnw",
    authDomain: "oasit-b6bc8.firebaseapp.com",
    databaseURL: "https://oasit-b6bc8.firebaseio.com",
    storageBucket: "oasit-b6bc8.appspot.com",
    messagingSenderId: "334270939180"
});

var coffeeRef = firebase.database().ref('coffees');
dbData.coffees.forEach(function (coffee) {
    console.log('adding coffee', coffee.name);
    coffeeRef.push({
        url: coffee.url,
        name: coffee.name,
        category: coffee.category,
        type: coffee.type,
        price: coffee.price
    });
});