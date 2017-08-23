import { CoffeesComponent } from './coffees/coffees.component';
import { CoffeeEditComponent } from './coffee-edit/coffee-edit.component';
import { CartComponent } from './cart/cart.component';
import { QueueComponent } from './queue/queue.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './admin/users/users.component';
import { ProductsComponent } from './admin/products/products.component';

export const routeConfig = [
  { path: '', component: CoffeesComponent },
  { path: 'cart', component: CartComponent},
  { path: 'queue', component: QueueComponent}
];

export const navigatableComponents = [
  // CoffeesComponent,
  // CoffeeEditComponent,
  CartComponent,
  QueueComponent
  // AdminComponent
];
