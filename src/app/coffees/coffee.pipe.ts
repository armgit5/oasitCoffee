import { Pipe, PipeTransform, Injectable } from '@angular/core';
import {Coffee} from "./coffee";
import { Category } from './category/category';
@Pipe({
    name: 'coffeeFilter',
    pure: false
})

@Injectable()
export class CoffeePipe implements PipeTransform {
    output: Coffee[] = [];
    transform(array: Coffee[], args: Category): any {
        this.output = [];
        console.log('arg', array, args);
        if (args != null) {
            
                for (var i = 0; i < array.length; i++) { 
                    // console.log(array[i].type, args.types.indexOf(array[i].type) >= 0);
                    console.log(args.$key != null);
                    if (args.$key != null) {
                        if (array[i].category === args.$key && args.types.indexOf(array[i].type) >= 0) {
                            this.output.push(array[i]);
                        }
                    } else {
                        if (args.types.indexOf(array[i].type) >= 0) {
                            this.output.push(array[i]);
                        }
                    }
                   
                } 
                    
            console.log('test', this.output);
            return this.output;
        } else {
            return array;
        }       
    }
}