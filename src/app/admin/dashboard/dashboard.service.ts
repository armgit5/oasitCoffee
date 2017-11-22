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
        limitToFirst: this.pageSize
      }
    });
  }

}
