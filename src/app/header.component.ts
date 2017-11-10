import { Component, Input, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { cartData } from './cart/cartData';
import { CoffeeService } from './coffees/coffee.service';
import { Observable } from 'rxjs/Observable';
import { Category } from './coffees/category/category';
import { CategoryService } from './coffees/category/category.service';
import { Subscription } from 'rxjs/Rx';
import { LoginService } from './login/login.service';
import { apiMethods } from '../environments/environment';
import { tokenNotExpired } from 'angular2-jwt';
import { User } from './admin/users/users';

@Component({
    selector: 'my-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    // coffeeCounts = cartData.cart.length;
    coffeeCounts: number;
    $coffeeCounts: Subscription;
    clicked: boolean = false;

    @ViewChild('staticModal') loginModal;

    @Input()
    count?: number;

    $logIn: Subscription;
    loginStatus = false;
    customerName: string;

    role = '';

    onFilter(filter) {
        this.categorySerivce.categoryChanged.emit(filter);
    }

    constructor(private coffeeService: CoffeeService,
                private categorySerivce: CategoryService,
                private loginService: LoginService) {

        this.$logIn = this.loginService.isLoggedIn.subscribe(isLoggedIn => {
              if (isLoggedIn) {
                  console.log('login');
                  this.loginStatus = true;
                  this.customerName = this.loginService.user.username;
                  this.role = this.loginService.user.role;
              } else {
                  console.log('false');
                  this.loginStatus = false;
                  this.customerName = null;
                  // don't force login
                  // this.login();
              }
          });

      if (this.loginService.user.email == null) {
        loginService.userOutput.subscribe(
          (user: User) => {
            console.log(user);
            this.role = user.role;
            // this.subToUserCoffees(user);
          }
        );
      } else {
        this.role = this.loginService.user.role;
      }
    }

    ngOnInit() {
        this.coffeeCounts = this.coffeeService.getCoffeeCounts();
        this.$coffeeCounts = this.coffeeService.coffeeCountsChanged
            .subscribe(coffeeCounts => this.coffeeCounts = coffeeCounts);
    }

    openNav() {
        if (!this.clicked) {
            document.getElementById('mySidenav').style.width = '17%';
            document.getElementById('mySidenav').style.paddingLeft = '4%';
            document.getElementById('mySidenav').style.paddingRight = '4%';
            this.clicked = true;
        } else {
            document.getElementById('mySidenav').style.width = '0';
             document.getElementById('mySidenav').style.paddingLeft = '0%';
            document.getElementById('mySidenav').style.paddingRight = '0%';
            this.clicked = false;
        }
    }

    menuOut() {
        document.getElementById('mySidenav').style.width = '0';
        document.getElementById('mySidenav').style.paddingLeft = '0%';
        document.getElementById('mySidenav').style.paddingRight = '0%';
        this.clicked = false;
    }

    ngOnDestroy() {
        this.$coffeeCounts.unsubscribe();
        this.$logIn.unsubscribe();
    }

    login() {
        this.loginModal.show();
    }

    admin() {

    }

    hideModal() {
      this.loginModal.hide();
    }

    logout() {
        this.loginService.logout();
    }

    accountInfo() {

    }

}
