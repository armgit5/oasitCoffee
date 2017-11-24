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

      // Check to see if total == 0
      // then do not add to queue
      if (queue.total !== 0) {
        this.db.list('queue').push(queue);
      }
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
      comments: comments,
      employeeEmail: employeeEmail,
      coffees: deletedQueue.cartCoffees
    };

    this.db.list('orders').push(order);
    this.addToDailyTotal(deletedQueue.dateTime, deletedQueue.total);
    this.db.object(`queue/${deletedQueue.$key}`).remove();
  }

  markReady($key, status) {
    this.db.object(`queue/${$key}`).update({readyStatus: status});
  }

  private addToDailyTotal(dateTime: number, total: number) {
    let d = new Date(dateTime);
    let formattedDate = `${d.getDate()}:${d.getMonth()}:${d.getFullYear()}`;
    // console.log(formattedDate);
    this.db.object(`/dailyTotals/${formattedDate}`).take(1).subscribe(
      oldTotal => {
        let newTotal = total;
        console.log(oldTotal);
        // if new date
        if (oldTotal.$value === null) {
          console.log('old');
          this.db.object(`/dailyTotals/${formattedDate}`).set({
            total: newTotal
          });
        } else {
          newTotal += oldTotal.total;
          this.db.object(`/dailyTotals/${formattedDate}`).update({
            total: newTotal
          });
        }
      }
    );

    console.log(d.getDate(), d.getMonth(), d.getFullYear(), total);
  }


}
