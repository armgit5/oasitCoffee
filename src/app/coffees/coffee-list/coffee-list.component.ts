import { Component, Input } from '@angular/core';
import { Coffee } from '../coffee';

@Component({
  selector: 'coffee-list-component',
  templateUrl: './coffee-list.component.html',
  styleUrls: ['./coffee-list.component.css']
})
export class CoffeeListComponent {

  @Input()
  coffees: Coffee[];

  constructor() {

  }



}
