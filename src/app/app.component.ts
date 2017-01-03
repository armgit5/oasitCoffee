import { Component } from '@angular/core';
// import { cartData } from './cart/cartData';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';



@Component({
  selector: 'app-root',
  template: `
              <div class="container main">
                <router-outlet></router-outlet>
              </div>
            `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    // coffeeCount = cartData.cart.length;

    courses$ : FirebaseListObservable<any>;

    constructor(private af: AngularFire) {
      this.courses$ = af.database.list('test');

      this.courses$.subscribe(
            val => console.log(val)
          );

    }
}
