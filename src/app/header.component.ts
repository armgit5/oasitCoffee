import { Component } from '@angular/core';
import { cartData } from './cart/cartData';
import { CoffeeService } from './coffees/coffee.service';
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'my-header',
    templateUrl: './header.component.html',
    styles: [`
        header {
        }
    
        ul {
          text-align: center;  
        }
        
        li {
            float: none;
            display: inline-block;
        }
        
        .router-link-active {
            background-color: #337ab7;
            color: white;
        }
    `]
})
export class HeaderComponent {
    coffeeCount = cartData.cart.length;


    
    

}   