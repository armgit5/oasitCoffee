import { Component, Input } from '@angular/core';
import { coffeesData } from './coffeesData';
import {Coffee} from "./coffee";

@Component({
  selector: 'coffee-component',
  template: `
    <div class="col-sm-6 col-md-4">
    <div class="thumbnail">
    <img src={{coffee.url}} alt="..." class="img-responsive">
    <div class="caption">
        <h3>{{coffee.name}}</h3>
        <p class="description">{{coffee.status}}</p>
        <div>
        <div class="clearfix">
            <div class="price pull-left">{{coffee.price | currency:'THB':true}}</div>

            <div class="input-group">
                <span class="input-group-btn">
                    <button type="button" class="btn btn-default btn-number" disabled="disabled" data-type="minus" data-field="quant[1]">
                        <span class="glyphicon glyphicon-minus"></span>
                    </button>
                </span>
                <input type="text" name="quant[1]" class="form-control input-number" value="1" min="1" max="10">
                <span class="input-group-btn">
                    <button type="button" class="btn btn-default btn-number" data-type="plus" data-field="quant[1]">
                        <span class="glyphicon glyphicon-plus"></span>
                    </button>
                </span>
            </div>

            <a href="#" class="btn btn-success pull-right" role="button">Add to cart</a>
        </div>
        </div>
    </div>
    </div>
    </div>
  `,
  styleUrls: ['./coffees.component.css']
})
export class CoffeeComponent {

    @Input("coffee")
    coffee: Coffee;

    
}
