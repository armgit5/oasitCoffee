import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { coffeesData } from '../coffees/coffeesData';
import { CoffeeService } from '../coffees/coffee.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { QueueService } from '../queue/queue.service';
import { Router } from "@angular/router";
import { Cart } from './cart';
import { User } from '../admin/users/users';

import { LoginService } from '../login/login.service';
import { Subscription } from 'rxjs/Rx';
import { apiMethods } from '../../environments/environment';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

    cartForm: FormGroup;
    customerName: string;

    cartItems = this.coffeeService.cartCoffees;
    total: number;

    newTotal: number = 0;
    newCount: number = 0;

    user: User = new User(null, null, null, null, null, null, null);

    $logIn: Subscription;

    // newAccount:boolean = true;

     @ViewChild('staticModal') loginModal;

    constructor(private coffeeService: CoffeeService,
                private formBuilder: FormBuilder,
                private queueService: QueueService,
                private router: Router,
                private loginService: LoginService) {

    }

    private assignUserInfo() {
        if (!this.loginService.user.username && this.loginService.user.email) {
            this.customerName = this.loginService.user.email;
        } else {
            this.customerName = this.loginService.user.username;
        }
    }

    ngOnInit() {

        // initialize user name if no name then use email
        this.assignUserInfo();

        this.$logIn = this.loginService.isLoggedIn.subscribe(isLoggedIn => {
            if (isLoggedIn) {
                // console.log("logged in");
                this.assignUserInfo();
                // console.log(this.customerName);
                this.onSubmit();
            } else {
                // console.log("false");
                this.customerName = null;
            }
        });

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

        let customerName = this.customerName;
        let customerImage = this.loginService.user.imageUrl;
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
            customerImage: [customerImage],
            cartCoffees: cartCoffees,
            customerName2: ['', Validators.required]
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
        this.cartItems.splice(index, 1);
    }

    setToZero() {
        this.customerName = null;
        this.coffeeService.cartCoffees = [];
        this.coffeeService.updateFetchCounts(0);
    }

    private addToQueue() {
        this.queueService.addQueue(this.cartForm.value);
        this.setToZero();
        this.router.navigate(['queue']);
    }

    onSubmit() {

        // if (this.customerName === undefined || this.customerName == null) {
        //     this.loginModal.show();
        // } else {
        //     this.addToQueue();
        // }
        this.addToQueue();
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
            this.coffeeService.updateFetchCounts(this.newCount);
            this.total = this.newTotal;

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

    hideModal() {
      this.loginModal.hide();
    }

    onHasName(name) {

    }

    ngOnDestroy() {
        this.$logIn.unsubscribe();
    }

}
