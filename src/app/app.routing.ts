import { CoffeesComponent } from "./coffees/coffees.component";
import { CartComponent } from './cart/cart.component';
import { QueueComponent } from './queue/queue.component';

export const routeConfig = [
  { path: "", component: CoffeesComponent },
  { path: "cart", component: CartComponent},
  { path: "queue", component: QueueComponent}
];

export const navigatableComponents = [
  CoffeesComponent,
  CartComponent,
  QueueComponent
];