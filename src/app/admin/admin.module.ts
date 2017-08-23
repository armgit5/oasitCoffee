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

@NgModule({

  declarations: [
    AdminComponent,
    SidebarComponent,
    UsersComponent,
    UserFormComponent,
    NavbarComponent,
    UserTableComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ModalModule
  ]

})

export class AdminModule {

}
