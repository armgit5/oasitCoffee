import { Component, OnInit, ViewChild } from '@angular/core';
// import { cartData } from './cartData';
import { coffeesData } from '../coffees/coffeesData';
import { CoffeeService } from '../coffees/coffee.service';
// import { element } from 'protractor/globals';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { QueueService } from '../queue/queue.service';
import { Router } from "@angular/router";
import { Cart } from './cart';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    cartForm: FormGroup;

    cartItems = this.coffeeService.cartCoffees;
    total: number;

    newTotal: number = 0;
    newCount: number = 0;

    @ViewChild('qtyInput') qtyInput; 

    constructor(private coffeeService: CoffeeService,
                private formBuilder: FormBuilder,
                private queueService: QueueService,
                private router: Router) {
        
        // For testing 
        // this.cartItems = [new Cart("-KhguZOrC43ph1D_oiwU","test","Cold",5,13,"comment",
        // "https://firebasestorage.googleapis.com/v0/b/oasit-b6bc8.appspot.com/o/images%2F-KhguZOrC43ph1D_oiwU1?alt=media&token=d6aa5dc2-071e-49dd-b4af-06eb801837f6"
        // )];

    }

    ngOnInit() {
        this.calculateTotal();
        this.initForm();

        // update cart in real time when qty changes
        this.updateCartRealTime();
           
    }

    updateCartRealTime() {
        this.cartForm.valueChanges.subscribe(data => {
            this.newTotal = 0;
            this.newCount = 0;
            let cartCoffes = [];
            data.cartCoffees.forEach(coffee => {
                this.newTotal += coffee.qty * coffee.price;
                this.newCount += coffee.qty;
                cartCoffes.push(coffee);
            });
            // console.log(this.newTotal, this.newCount);
            this.coffeeService.updateFetchCounts(this.newCount);
            this.total = this.newTotal;
        
            //update coffee service cart coffee qty
            this.coffeeService.cartCoffees = cartCoffes;
        });
    }

    private initForm() {
        console.log(this.cartItems);

        let customerName = "Arm";
        let cartCoffees: FormArray = new FormArray([]);

        this.cartItems.forEach(coffee => {
            cartCoffees.push(new FormGroup({
                coffeeId: new FormControl(coffee.coffeeId),
                coffeeName: new FormControl(coffee.coffeeName), 
                coffeeType: new FormControl(coffee.coffeeType),
                qty: new FormControl(coffee.qty, Validators.required),
                price: new FormControl(coffee.price),
                comment: new FormControl(coffee.comment),
                imageUrl: new FormControl(coffee.imageUrl)
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

    delete(index) {
        (<FormArray>this.cartForm.controls['cartCoffees']).removeAt(index);
        
        // this.coffeeService.fetchCounts(-(this.cartItems[index]).qty);
        this.cartItems.splice(index, 1);
        // this.calculateTotal();
    }

    setToZero() {
        this.coffeeService.cartCoffees = [];
        this.coffeeService.updateFetchCounts(0);
    }

    onSubmit() {
        this.queueService.addQueue(this.cartForm.value);
        //update coffee service cart coffees and cart items to []
        // this.setToZero();

        // this.router.navigate(['queue']);
    }

    update() {
        this.cartForm.value.forEach(data => {
            this.newTotal = 0;
            this.newCount = 0;
            let cartCoffes = [];
            data.cartCoffees.forEach(coffee => {
                this.newTotal += coffee.qty * coffee.price;
                this.newCount += coffee.qty;
                cartCoffes.push(coffee);
            });
            // console.log(this.newTotal, this.newCount);
            this.coffeeService.updateFetchCounts(this.newCount);
            this.total = this.newTotal;
        
            //update coffee service cart coffee qty
            this.coffeeService.cartCoffees = cartCoffes;
        });
    }

    minus(i) {
        
        if (this.cartForm.value.cartCoffees[i].qty > 1) {
            this.cartForm.value.cartCoffees[i].qty--;
            this.total -= Number(this.cartForm.value.cartCoffees[i].price);
            this.coffeeService.fetchCounts(-1);

            //update coffee service cart coffee qty
            this.coffeeService.cartCoffees = this.cartForm.value.cartCoffees;

        }
    }

    plus(i) {
        
        this.cartForm.value.cartCoffees[i].qty++;
        this.total += Number(this.cartForm.value.cartCoffees[i].price);
        this.coffeeService.fetchCounts(1);

        //update coffee service cart coffee qty
        this.coffeeService.cartCoffees = this.cartForm.value.cartCoffees;

        
    }

}
