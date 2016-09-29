import {Pipe, PipeTransform} from "@angular/core";
import {Coffee} from "./coffee";
@Pipe({
    name: 'coffeeFilter'
})

export class CoffeePipe implements PipeTransform {
    output = new Array();
    transform(array: any[], args: any[]): any {
       
        for (var i = 0; i < array.length; i++) { 
            if (array[i].price < 60) {
                this.output.push(array[i]);
            }
            
        }
        
        return this.output;
    }
}