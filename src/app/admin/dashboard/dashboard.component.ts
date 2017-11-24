import { Component } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Order } from './order';

@Component({
  selector: 'products',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../admin.component.css',
                '../animate.min.css',
                '../demo.css',
                '../light-bootstrap-dashboard.css']
})
export class DashboardComponent {

  orders: Order[];

  constructor(private dashboardService: DashboardService) {
    this.loadFirstOrder();
  }

  loadFirstOrder() {
    this.dashboardService.loadFirstOrder().subscribe(
      orders => {
        console.log(orders);
        this.orders = orders;
        console.log(this.orders);
      }
    );
  }

  deleteOrder($key) {

  }
}
