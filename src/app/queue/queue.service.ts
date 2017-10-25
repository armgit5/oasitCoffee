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

  addQueue(cart) {
    // push queue to firebase without key

    if (apiMethods.v1) {
      let queue = {customerName: cart.customerName2,
      customerImage: cart.customerImage,
      cartCoffees: cart.cartCoffees,
      readyStatus: false};
      this.db.list('queue').push(queue);
    }

  }

  getQueue(): Observable<Queue[]> {
    return this.db.list('queue');
  }

  deleteQueue($key) {
    console.log(`queue/${$key}`);
    this.db.object(`queue/${$key}`).remove();
  }

  markReady($key, status) {
    this.db.object(`queue/${$key}`).update({readyStatus: status});
  }


}
