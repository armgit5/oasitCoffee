import { Injectable, Inject } from '@angular/core';
import { Queue } from './queue';
import { Http } from '@angular/http';
import { FirebaseRef, AngularFire } from 'angularfire2';
import {Observable, Subject} from 'rxjs/Rx';

@Injectable()
export class QueueService {

  queues: Queue[] = [];

  sdkDb: any;

  constructor(private http: Http, @Inject(FirebaseRef) fb, private af: AngularFire) {
      this.sdkDb = fb.database().ref();
    
  }
  
  addQueue(cart) {
    // push queue to firebase without key
    let queue = {customerName: cart.customerName, cartCoffees: cart.cartCoffees};  
    this.sdkDb.child("queue").push(queue);
  }

  getQueue(): Observable<Queue[]> {
    return this.af.database.list('queue');  
  }

  deleteQueue($key) {
    console.log(`queue/${$key}`);
    this.af.database.object(`queue/${$key}`).remove();
  }


}
