import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { Coffee } from "./coffee";
import { Category } from './category/category';
@Pipe({
  name: 'coffeeFilter',
  pure: false
})

@Injectable()
export class CoffeePipe implements PipeTransform {
  output: Coffee[] = [];
  transform(array: Coffee[], args: Category, searchVal: string, typesMap: any): any {
    this.output = [];

    if (searchVal !== '') {
      console.log(searchVal);
      for (let i = 0; i < array.length; i++) {
        if (array[i].name.toLowerCase().indexOf(searchVal.toLowerCase()) !== -1) {
          this.output.push(array[i]);
        }
      }
      return this.output;
    }

    if (args != null) {

      for (let i = 0; i < array.length; i++) {
        // console.log(array[i].category, args.$key, array[i].type, args.types);
        if (args.$key != null) {
          if (array[i].category === args.$key && args.types.indexOf(typesMap.get(array[i].type)) >= 0) {
            this.output.push(array[i]);
          }
        } else {
          if (args.types.indexOf(typesMap.get(array[i].type)) >= 0) {
            this.output.push(array[i]);
          }
        }

      }

      return this.output;
    } else {
      return array;
    }


  }
}
