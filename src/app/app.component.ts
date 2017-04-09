import { Component } from '@angular/core';
import { cartData } from './cart/cartData';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';



@Component({
  selector: 'app-root',
  template: `
              <div class="container main">
                <my-header [count]="cartItems.length"></my-header>
                <router-outlet></router-outlet>
              </div>

              <button type="button" class="btn btn-primary" (click)="staticModal.show()">Static modal</button>
 
<div class="modal fade" bsModal #staticModal="bs-modal" [config]="{backdrop: 'static'}"
     tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title pull-left">Static modal</h4>
        <button type="button" class="close pull-right" aria-label="Close" (click)="staticModal.hide()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        This is static modal, backdrop click will not close it.
        Click <b>&times;</b> to close modal.
      </div>
    </div>
  </div>
</div>
            `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    courses$ : FirebaseObjectObservable<any>;
    cartItems = cartData.cart;

    constructor(private af: AngularFire) {
    
    }
}
