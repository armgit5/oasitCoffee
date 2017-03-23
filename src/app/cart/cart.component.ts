import { Component, OnInit } from '@angular/core';
// import { cartData } from './cartData';
import { coffeesData } from '../coffees/coffeesData';
import { CoffeeService } from '../coffees/coffee.service';
import { element } from 'protractor/globals';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    cartForm: FormGroup;

    cartItems = this.coffeeService.cart;
    total: number;

    constructor(private coffeeService: CoffeeService,
                private formBuilder: FormBuilder) {
        
    }

    ngOnInit() {
        this.calculateTotal();
        this.initForm();
    }

    private initForm() {

        let customerName = "Arm";
        let cartCoffees: FormArray = new FormArray([]);

        this.cartItems.forEach(coffee => {
            cartCoffees.push(new FormGroup({
                coffeeId: new FormControl(coffee.coffeeId),
                coffeeName: new FormControl(coffee.coffeeName), 
                coffeeType: new FormControl(coffee.coffeeType),
                qty: new FormControl(coffee.qty, Validators.required),
                price: new FormControl(coffee.price),
                comment: new FormControl(coffee.comment)
            }));
        });
        
        this.cartForm = this.formBuilder.group({
            customerName: [customerName],
            cartCoffees: cartCoffees
        });


    }   

    calculateTotal() {
        this.total = 0;
        this.cartItems.forEach(element => {
            this.total = this.total + element.qty * element.price;
        });
    }

    update(cartItem) {
        console.log(cartItem);
    }

    valuechange(newValue, coffeeId) {
        
        console.log(newValue, coffeeId)
    }

    delete(index) {
        // this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
        (<FormArray>this.cartForm.controls['cartCoffees']).removeAt(index);
        this.calculateTotal();
        console.log((<FormArray>this.cartForm.controls['cartCoffees']).controls);
        // this.coffeeService.fetchCounts(-cartItem.qty);
    }

    onSubmit() {
        console.log(this.cartForm.value);
    }

}
