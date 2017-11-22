import { Injectable, Inject } from '@angular/core';
import { Queue } from './queue';
import { Http } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import {Observable, Subject} from 'rxjs/Rx';
import { apiMethods } from '../../environments/environment';

@Injectable()
export class QueueService {

  queues: Queue[] = [];
  sdkDb: any;

  constructor(private db: AngularFireDatabase) {

  }

  addQueue(cart, total) {
    // push queue to firebase without key

    if (apiMethods.v1) {
      let queue = {customerName: cart.customerName2,
      customerImage: cart.customerImage,
      cartCoffees: cart.cartCoffees,
      readyStatus: false,
      dateTime: Date.now(),
      total: total
    };
      this.db.list('queue').push(queue);
    }

  }

  getQueue(): Observable<Queue[]> {
    return this.db.list('queue');
  }

  deleteQueue(deletedQueue: Queue, employeeEmail: string) {
    let comments: string[] = [];
    if (deletedQueue.cartCoffees) {
      deletedQueue.cartCoffees.forEach(coffee => {
        if (coffee.comment !== '') {
          comments.push(coffee.comment);
        }
      });
    }

    let order = {
      customerName: deletedQueue.customerName,
      dateTime: deletedQueue.dateTime,
      total: deletedQueue.total,
      queueKey: deletedQueue.$key,
      comments: comments,
      employeeEmail: employeeEmail
    };

    this.db.list('orders').push(order);
    this.db.object(`queue/${deletedQueue.$key}`).remove();
  }

  markReady($key, status) {
    this.db.object(`queue/${$key}`).update({readyStatus: status});
  }


}
