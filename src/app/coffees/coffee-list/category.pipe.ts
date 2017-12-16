import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { Category } from '../category/category';
import { Coffee } from '../coffee';
import { CoffeeList } from './coffee-list';

@Pipe({
  name: 'categoryFilter'
})

@Injectable()
export class CategoryPipe implements PipeTransform {
  categoriedCoffees: Coffee[];
  coffeeList: CoffeeList;
  transform(coffees: Coffee[], category: Category): any {
    this.categoriedCoffees = [];
    if (category != null) {
      console.log(coffees);

      if (coffees) {
        for (let i = 0; i < coffees.length; i ++) {
          if (coffees[i].category === category.$key) {
            this.categoriedCoffees.push(coffees[i]);
          }
        }

      }

      return this.categoriedCoffees;
    } else {
      return coffees;
    }
  }
}
