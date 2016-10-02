import {Pipe, PipeTransform} from "@angular/core";
import {Coffee} from "./coffee";
@Pipe({
    name: 'coffeeFilter'
})

export class CoffeePipe implements PipeTransform {
    output: Coffee[] = [];
    transform(array: Coffee[], args: number): any {
        this.output = [];
        if (args != null) {
            for (var i = 0; i < array.length; i++) { 
                if (array[i].category === args) {
                    this.output.push(array[i]);
                }
            } 

            return this.output 
        } else {
            return array;
        }       
    }
}