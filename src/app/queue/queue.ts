import { Cart } from '../cart/cart';

export class Queue {
    
    constructor(
                public $key,
                public customerName:string,
                public cartCoffees: Cart[]
                ) {

    } 

    static fromJsonList(array): Queue[] {
        return array.map(Queue.fromJson);
    }

    static fromJson({$key, customerName, cartCoffee}):Queue {
       return  new Queue($key, customerName, cartCoffee);
    }
}