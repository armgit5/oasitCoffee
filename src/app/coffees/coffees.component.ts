import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { coffeesData } from './coffeesData';
import { cartData } from '../cart/cartData';
import { CoffeeService } from './coffee.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { Coffee } from './coffee';
import { Router } from '@angular/router';
import { CategoryService } from './category/category.service';
import { Category } from './category/category';
import { CoffeeOutput } from './coffee-output';
import { LoginService } from '../login/login.service';
import { apiMethods } from '../../environments/environment';
import { tokenNotExpired } from 'angular2-jwt';
import { User } from '../admin/users/users';
import { HeaderService } from '../header.service';

@Component({
  selector: 'coffee',
  templateUrl: './coffees.component.html'
})
export class CoffeesComponent {

    coffees: Coffee[];
    filterArg: Category;
    searchVal: string = '';
    $coffee: Subscription;
    apiMethodV1 = apiMethods.v1;

    public alerts: any = [];

    // Company Name and User Name
    email = '';
    companyName = '';
    role = '';

    searchName = 'la';
    imageView = true;

    // isNew: boolean = true;
    // inputId: string = "";

    @ViewChild('staticModal') button;

    onFilter(filter) {
        this.filterArg = filter;
    }

    constructor(private coffeeService: CoffeeService,
                private router: Router,
                private categoryService: CategoryService,
                private loginService: LoginService,
                private headerService: HeaderService) {

      if (apiMethods.v1 || apiMethods.vCompanies) {

        this.subToUserCoffees(this.loginService.user);

        // This is for the first time opening the page
        // and the user info is not loaded fast enough
        // from firebase
        loginService.userOutput.subscribe(
          (user: User) => {
            console.log(user);
            this.email = user.email;
            this.companyName = user.companyName;
            this.role = user.role;
          }
        );
        if (this.loginService.user.email != null) {
          this.email = this.loginService.user.email;
          this.companyName = this.loginService.user.companyName;
          this.role = this.loginService.user.role;
        }

        console.log(this.role);

        this.categoryService.categoryChanged.subscribe(filterArg => {
          this.filterArg = filterArg;
          console.log(filterArg);
        });

        // Subcribe to search val
        this.headerService.searchValOutput.subscribe(
          searchVal => {
            this.searchVal = searchVal;
          }
        );

      }

      if (apiMethods.vWuth) {
        if (localStorage.getItem('username') == null) {
          loginService.userOutput.subscribe(
          (user: User) => {
            this.email = user.email;
            this.companyName = user.companyName;
            this.subToUserCoffees(user);
          });
        } else {
          this.email = localStorage.getItem('username');
        }
        this.companyName = 'OASIT';
        this.coffeeService.loadAllCoffees(null).subscribe(
          coffees => {this.coffees = coffees; console.log(coffees)}
        );
      }
    }

    private subToUserCoffees(user: User) {
        if (apiMethods.v1 || apiMethods.vCompanies) {
          this.$coffee = this.coffeeService.loadAllCoffees(user).subscribe(
            coffees => {
              this.coffees = coffees;
              this.coffeeService.coffees = coffees;
              // console.log(JSON.stringify(coffees));
            }
          );
        }
    }

    newCoffee() {

      this.coffeeService.editCoffee(true, '');
      this.button.show();

    }

    onNgDestroy() {
      this.$coffee.unsubscribe();
    }

    hide() {
      this.button.hide();
    }

    hideModal() {
      this.hide();
    }

    onEdit(coffeeOutput) {
      // console.log('edit');
      this.button.show();
    }

    onAdd(coffeeName) {
      this.alerts.push({
        type: 'success',
        msg: `You successfully added ${coffeeName}`,
        timeout: 2000
      });
    }

    onImageView() {
      this.imageView = true;
    }

    onListView() {
      this.imageView = false;
    }


}
