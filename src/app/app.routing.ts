import { CoffeesComponent } from "./coffees/coffees.component";
import { CartComponent } from './cart/cart.component';

export const routeConfig = [
  { path: "", component: CoffeesComponent },
  { path: "cart", component: CartComponent}
];

export const navigatableComponents = [
  CoffeesComponent,
  CartComponent
];