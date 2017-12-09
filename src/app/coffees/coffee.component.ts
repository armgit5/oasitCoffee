import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {Coffee} from './coffee';
import { cartData } from '../cart/cartData';
import { CoffeeService } from './coffee.service';
import { Router } from '@angular/router';
import { CoffeeOutput } from './coffee-output';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'coffee-component',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css']
})
export class CoffeeComponent implements OnInit {

    @Input()
    coffee: Coffee;

    @Output()
    editCoffeeOutput = new EventEmitter<CoffeeOutput>();

    @Output()
    addCoffeeOutput = new EventEmitter<string>();

    mouseOver = false;
    added = false;

    coffeeCount = 1;
    coffeeCountModel = 1;
    cart = cartData.cart;
    comment = '';
    public alerts: any = [];

    @Input()
    role = '';

    constructor(private coffeeService: CoffeeService,
                private router: Router,
                private loginService: LoginService) {
    }

    ngOnInit() {

    }

    plus() {
      this.coffeeCount++;
    }

    minus() {
      if (this.coffeeCount > 1) {
        this.coffeeCount--;
      }
    }

    addCoffeeAlert() {
      this.added = true;
      setTimeout(() => {
        this.added = false;
      }, 1000);
    }

    add() {
      this.addCoffeeAlert();
      this.coffeeService.addToCart(this.coffee, Number(this.coffeeCount), this.comment);
      this.coffeeCount = 1;
      // this.alerts.push({
      //   type: 'md-local',
      //   msg: `${this.coffee.name} is added to cart`,
      //   timeout: 2000
      // });
      this.comment = '';
      this.addCoffeeOutput.emit(this.coffee.name);
    }

    editCoffee() {
      // this.router.navigate(['/coffee', this.coffee.$key, "edit"]);
      // let outputData = new CoffeeOutput(false, this.coffee.$key);
      // this.editCoffeeOutput.emit(outputData);
      this.coffeeService.editCoffee(false, this.coffee.$key);
      this.editCoffeeOutput.emit();
    }

    deleteCoffee() {
      console.log('delete coffee ' + this.coffee.$key);
      this.coffeeService.deleteCoffee(this.coffee.$key);
    }

    over() {
      this.mouseOver = true;
    }

    out() {
      this.mouseOver = false;
    }


}
