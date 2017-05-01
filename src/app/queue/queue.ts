import { Cart } from '../cart/cart';

export class Queue {
    
    constructor(
                public $key,
                public customerName: string,
                public customerImage: string,
                public cartCoffees: Cart[]
                ) {

    } 

    static fromJsonList(array): Queue[] {
        return array.map(Queue.fromJson);
    }

    static fromJson({$key, customerName, customerImage, cartCoffee}):Queue {
       return  new Queue($key, customerName, customerImage, cartCoffee);
    }
}