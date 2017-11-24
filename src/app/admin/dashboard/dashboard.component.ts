import { Component, ViewChild } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Order } from './order';
import { DailyTotal } from './dailyTotal';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';



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
  private data: number[] = [];
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = [];
  public barChartType = 'bar';
  public barChartLegend = false;

  public barChartData: any[] = [
    {data: [], label: 'Daily Total' }
  ];

  constructor(private dashboardService: DashboardService) {
    this.loadFirstOrder();
    this.loadDailyTotals();
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

  loadDailyTotals() {
    this.data = [];
    this.barChartLabels = [];
    this.dashboardService.loadDailyTotals().subscribe(
      (dailyTotals: DailyTotal[]) => {
        dailyTotals.forEach(total => {
          this.data.push(total.total);
          this.barChartLabels.push(total.$key);
        });
        this.barChartData = this.data;
      }
    );

  }

  deleteOrder($key) {

  }




}
