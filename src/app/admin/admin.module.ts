import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { UserFormComponent } from './users/userform/userform.component';
import { UserTableComponent } from './users/usertable/usertable.component';
import { ModalModule } from 'ngx-bootstrap';
import { ProductsComponent } from './products/products.component';
import { AdminRoutingModule } from './admin-routing.module';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({

  declarations: [
    AdminComponent,
    SidebarComponent,
    UsersComponent,
    UserFormComponent,
    NavbarComponent,
    UserTableComponent,
    ProductsComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ModalModule,
    AdminRoutingModule,
    Ng2TableModule
  ]

})

export class AdminModule {

}
