import { Component, Input } from '@angular/core';
import { Coffee } from '../coffee';
import { CoffeeService } from '../coffee.service';
import { Category } from 'aws-sdk/clients/support';
import { Type } from '@angular/compiler/src/output/output_ast';
import { Key } from 'selenium-webdriver';

@Component({
  selector: 'coffee-list-component',
  templateUrl: './coffee-list.component.html',
  styleUrls: ['./coffee-list.component.css']
})
export class CoffeeListComponent {

  @Input()
  coffees: Coffee[];

  @Input()
  typesMap = new Map<string, string>();

  @Input()
  catMap = new Map();

  @Input()
  coffeeMap = new Map();

  categoriedCoffees: Coffee[];
  categories: Category[];
  types: Type[];
  categoryTypes = {
    "Coffee": {
      "Coffees": [
        "Mocha",
        "Latte"
      ],
      "Types": [
        "Hot",
        "Cold"
      ]
    },
    "Frappe": {
      "Coffees": [
        "Green tea",
        "Americano"
      ],
      "Types": [
        "Ice",
        "Cold"
      ]
    }
  };

  constructor(private coffeeService: CoffeeService) {
    coffeeService.loadCategories().subscribe(categories => {
      this.categories = categories;

    });

    coffeeService.loadTypes().subscribe(types => {
      this.types = types;
    });

  }

  getTypesFromCategory(categoryName) {
    let output = [];
    if (categoryName && this.catMap.has(categoryName)) {
      let map = this.catMap.get(categoryName);
      if (map) {
        map.forEach((value: boolean, key: string) => {
          output.push(value);
        });
      }
    }
    return output;
  }


  getCoffeesFromCategory(categoryName) {
    let output = [];
    if (categoryName && this.coffeeMap.has(categoryName)) {
      // console.log(this.coffeeMap.get(categoryName));
      let map = this.coffeeMap.get(categoryName);
      if (map) {
        map.forEach((value: boolean, key: string) => {
          output.push(key);
        });
      }
    }
    return output;
  }

  getPriceFromCategoryCoffeeType(categoryName, coffeeName, typeName) {
    // console.log(categoryName, coffeeName, typeName);
    let price = 0;
    if (typeName && categoryName && this.coffeeMap.has(categoryName)) {
      let categoryMap = this.coffeeMap.get(categoryName);
      if (categoryMap) {
        let coffMap = categoryMap.get(coffeeName);
        if (coffMap) {
          coffMap.forEach(val => {
            if (this.typesMap.get(val.type) === typeName) {
              price = val.price;
            }
          });
        }
      }
    }
    if (price === 0) {
      return null;
    }
    return price;
  }

}
