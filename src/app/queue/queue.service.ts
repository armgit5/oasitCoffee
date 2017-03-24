import { Injectable } from '@angular/core';
import { Queue } from './queue';

@Injectable()
export class QueueService {

  queues: Queue[] = [];

  constructor() { }

  addQueue(cart) {
    let queue = new Queue(cart.customerName, cart.cartCoffees);
    this.queues.push(queue);
    console.log(this.queues);   
  }
}
