import { Cart } from '../cart/cart';

export class Queue {
    
    constructor(
                public customerName:string,
                public cartCoffees: Cart[]
                ) {

    } 
}