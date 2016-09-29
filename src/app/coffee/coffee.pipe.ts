import {Pipe, PipeTransform} from "@angular/core";
import {Coffee} from "./coffee";
@Pipe({
    name: 'coffeeFilter'
})

export class CoffeePipe implements PipeTransform {
    output = new Array();
    transform(array: any[], args: number): any {
        console.log(args);
        console.log(args === 1);
        if (args === 1) {
            for (var i = 0; i < array.length; i++) { 
                if (array[i].price < 60) {
                    this.output.push(array[i]);
                }
                
            }
            return this.output;
        } else {
            return array;
        }
        
        
        
    }
}