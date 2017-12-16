import { Component, Input } from '@angular/core';
import { Coffee } from '../coffee';
import { CoffeeService } from '../coffee.service';
import { Category } from 'aws-sdk/clients/support';

@Component({
  selector: 'coffee-list-component',
  templateUrl: './coffee-list.component.html',
  styleUrls: ['./coffee-list.component.css']
})
export class CoffeeListComponent {

  @Input()
  coffees: Coffee[];

  categories: Category[];

  constructor(private coffeeService: CoffeeService) {
    coffeeService.loadCategories().subscribe(categories => {
      this.categories = categories;
    });
  }




}
