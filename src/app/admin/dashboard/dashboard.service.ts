import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';



@Injectable()
export class DashboardService {

  pageSize = 10;

  constructor(private db: AngularFireDatabase) {

  }

  loadFirstOrder() {
    return this.db.list('orders', {
      query: {
        limitToLast: this.pageSize
      }
    }).map(orders => orders.reverse());
  }

  loadDailyTotals() {
    return this.db.list('dailyTotals', {
      query: {
        limitToLast: 7
      }
    }).map(totals => totals.reverse());
  }

  deleteOrder($key: string) {
    this.db.object('/orders/' + $key).remove()
    .then(() => {
    })
    .catch(error => console.log('Delete Order Error'));
  }
}
