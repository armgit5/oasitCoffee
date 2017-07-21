import { CoffeesComponent } from "./coffees/coffees.component";
import { CoffeeEditComponent } from './coffee-edit/coffee-edit.component';
import { CartComponent } from './cart/cart.component';
import { QueueComponent } from './queue/queue.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './admin/users/users.component';

export const routeConfig = [
  { path: "", component: CoffeesComponent },
  { path: "cart", component: CartComponent},
  { path: "queue", component: QueueComponent},
  { path: "coffee", children: [
    {
      path: 'new',
      component: CoffeeEditComponent
    },
    {
      path: ':id/edit',
      component: CoffeeEditComponent
    }
  ]},
  { path: "admin", component: AdminComponent, children: [
    { path: "user",
      component: UsersComponent
    }
  ]},
];

export const navigatableComponents = [
  // CoffeesComponent,
  // CoffeeEditComponent,
  CartComponent,
  QueueComponent,
  AdminComponent
];
