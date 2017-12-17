import { Component, ViewChild } from '@angular/core';
import { CoffeeService } from './coffee.service';
import { Subscription } from 'rxjs/Rx';
import { Coffee } from './coffee';
import { Router } from '@angular/router';
import { CategoryService } from './category/category.service';
import { Category } from './category/category';
import { LoginService } from '../login/login.service';
import { User } from '../admin/users/users';
import { HeaderService } from '../header.service';
import { categoriesData } from './category/categoriesData';

@Component({
  selector: 'coffee',
  templateUrl: './coffees.component.html'
})
export class CoffeesComponent {

  coffees: Coffee[];
  filterArg: Category;
  searchVal = '';
  $coffee: Subscription;
  typesMap = new Map<string, string>();

  public alerts: any = [];

  // Company Name and User Name
  email = '';
  companyName = '';
  role = '';

  searchName = 'la';
  imageView = false;

  coffeeMap = new Map();
  catMap = new Map();

  @ViewChild('staticModal') button;

  onFilter(filter) {
    this.filterArg = filter;
  }

  constructor(private coffeeService: CoffeeService,
    private router: Router,
    private categoryService: CategoryService,
    private loginService: LoginService,
    private headerService: HeaderService) {



    this.subToUserCoffees(this.loginService.user);

    // This is for the first time opening the page
    // and the user info is not loaded fast enough
    // from firebase
    loginService.userOutput.subscribe(
      (user: User) => {
        // console.log(user);
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

    this.categoryService.categoryChanged.subscribe(filterArg => {
      this.filterArg = filterArg;
    });

    // Subcribe to search val
    this.headerService.searchValOutput.subscribe(
      searchVal => {
        this.searchVal = searchVal;
      }
    );

    this.coffeeService.loadTypes().subscribe(
      types => {
        types.forEach(type => {
          if (!this.typesMap.has(type.$key)) {
            this.typesMap.set(type.$key, type.name);
          }
        });
        // console.log(this.typesMap);
      }
    );

  }

  private subToUserCoffees(user: User) {

    let coffeeMap = new Map();
    let catMap = new Map();
    this.$coffee = this.coffeeService.loadAllCoffees(user).subscribe(
      coffees => {
        this.coffees = coffees;

        this.coffeeService.loadCategories().subscribe(categories => {

          categories.forEach(category => {

            coffees.forEach(coffee => {

              if (coffee.category === category.$key) {

                if (!coffeeMap.has(category.name)) {
                  coffeeMap.set(category.name, new Map());
                  catMap.set(category.name, new Map());
                }

                if (!catMap.get(category.name).has(coffee.type)) {
                  catMap.get(category.name).set(coffee.type, this.typesMap.get(coffee.type));
                }

                if (!coffeeMap.get(category.name).has(coffee.name)) {
                  coffeeMap.get(category.name).set(coffee.name, []);
                }

                coffeeMap.get(category.name).get(coffee.name).push({
                  coffeeKey: coffee.$key,
                  type: coffee.type,
                  price: coffee.price
                });


              }

            });

          });

          // console.log(coffeeMap);
          // console.log(catMap);
          this.coffeeMap = coffeeMap;
          this.catMap = catMap;

        });




        this.coffeeService.coffees = coffees;
      }
    );
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
