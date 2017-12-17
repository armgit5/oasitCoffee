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
  coffeeList: any[];
  coffeeMap = new Map<string, number>();
  transform(coffees: Coffee[], category: Category): any {


  }
}
