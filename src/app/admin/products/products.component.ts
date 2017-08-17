import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['../admin.component.css',
                '../animate.min.css',
                '../demo.css',
                '../light-bootstrap-dashboard.css']
})
export class ProductsComponent implements OnInit {

  nodes = [
    {
      id: 1,
      name: 'categories',
      children: [
        { id: 2, name: 'coffees', children: [
          { id: 8, name: 'hot' },
          { id: 9, name: 'cold' },
          { id: 10, name: 'shake' }
        ]},
        { id: 3, name: 'foods' },
        { id: 11, name: 'cakes' }
      ]
    },
    {
      id: 4,
      name: 'attributes',
      children: [
        { id: 5, name: 'sm' },
        { id: 6, name: 'md' },
        { id: 6, name: 'lg' }
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }


}
