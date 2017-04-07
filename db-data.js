var dbData = {

    coffees: [
        {
            id:1,
            url: "http://www.precisionnutrition.com/wordpress/wp-content/uploads/2010/01/cup-of-black-coffee1.jpg",
            name: "Espresso",
            category: 1,
            type: "hot",
            price: 50
        },
        {
            id:2,
            url: "http://appforhealth.com/wp-content/uploads/2014/09/coffee.jpg",
            name: "Latte",
            category: 1,
            type: "hot",
            price: 55
        },
        {
            id:3,
            url: "http://s3.amazonaws.com/etntmedia/media/images/ext/349520825/green-tea-weight-loss-heart.jpg",
            name: "Green tea",
            category: 2,
            type: "hot",
            price: 40
        },
        {
            id:4,
            url: "http://www.bonappetit.com/wp-content/uploads/2014/05/dublin-iced-coffee-620x567-1436806306.jpg",
            name: "Latte",
            category: 2,
            type: "cold",
            price: 60
        },
        {
            id:5,
            url: "http://www.hoteliermiddleeast.com/pictures/Iced-Cocoa-Cappuccino.jpg",
            name: "Cappuccino",
            category: 1,
            type: "cold",
            price: 65,
            cart: {
                    qty: 5,
                    comment: "add more sugar"
                }     
            
        },
        {
            id:6,
            url: "http://globalassets.starbucks.com/assets/cbbe8f49e8a640c19020788a735a6c59.jpg",
            name: "Frappucino",
            category: 4,
            type: "cold",
            price: 75,
            cart: {
                    qty: 4,
                    comment: "add less sugar too"
                }     
            
        },
        {
            id:7,
            url: "https://assets.entrepreneur.com/slideshow/20150326180322-starbucks-frappuccino-2-strawberry-cheesecake.jpeg",
            name: "Captian crunch",
            category: 3,
            type: "cold",
            price: 80
        },
        {
            id:8,
            url: "http://junkfoodbetty.com/wp-content/uploads/2011/06/Pacific_Northwest_Iced_Coffee.jpg",
            name: "Espresso",
            category: 1,
            type: "cold",
            price: 55,
            cart: {
                    qty: 2,
                    comment: "add less sugar"
                }     
        }
    ],

    cart: [
        {
            id:1,
            coffeeId: 1,
            qty: 2,
            comment: "add less sugar"
        },
        {
            id:2,
            coffeeId: 2,
            qty: 4,
            comment: "add less sugar too"
        },
        {
            id:3,
            coffeeId: 3,
            qty: 5,
            comment: "add more sugar"
        }
    ],

    categories: [
        {
            id:1,
            name: "Coffee"
        },
        {
            id:2,
            name: "Menu"
        },
        {
            id:3,
            name: "Special menu"
        },
        {
            id:4,
            name: "Frappe"
        },
        {
            id:5,
            name: "Foods"
        },
        {
            id:6,
            name: "Beers"
        }
    ],

    types: [
        {
            id:1,
            name: "Hot"
        },
        {
            id:2,
            name: "Cold"
        },
        {
            id:3,
            name: "Shake"
        }
    ]



};

module.exports = dbData;

