import { NgModule } from '@angular/core';
import { Routes } from '@angular/router/router';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const adminRoutes: Routes = [
  { path: '', component: AdminComponent, children: [
    {
      path: 'dashboard',
      component: DashboardComponent
    },
    { path: 'user',
      component: UsersComponent
    },
    {
      path: 'product',
      component: ProductsComponent
    }
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {

}
