import { CoffeesComponent } from "./coffees/coffees.component";
import { CartComponent } from './cart/cart.component';
import { QueueComponent } from './queue/queue.component';
import { CoffeeEditComponent } from './coffee-edit/coffee-edit.component';

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
];

export const navigatableComponents = [
  CoffeesComponent,
  CartComponent,
  QueueComponent,
  CoffeeEditComponent
];