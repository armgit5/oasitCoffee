import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';



@Injectable()
export class DashboardService {

  pageSize = 2;

  constructor(private db: AngularFireDatabase) {

  }

  loadFirstOrder() {
    return this.db.list('orders', {
      query: {
        limitToLast: this.pageSize
      }
    }).map(orders => orders.reverse());
  }

  deleteOrder($key: string) {
    this.db.object('/orders/' + $key).remove()
    .then(() => {
    })
    .catch(error => console.log('Delete Order Error'));
  }
}
