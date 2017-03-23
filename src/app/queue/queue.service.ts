import { Injectable } from '@angular/core';
import { Queue } from './queue';

@Injectable()
export class QueueService {

  queue: Queue;

  constructor() { }

  addQueue(cart) {
    console.log(cart.customerName);
    // console.log(cart.cartCoffees);
    
    cart.cartCoffees.forEach(cartCoffee => {
      console.log(cartCoffee);
    });
    
  }
}
