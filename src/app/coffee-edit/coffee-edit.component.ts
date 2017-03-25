import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Coffee } from '../coffees/coffee';
import { AngularFire } from 'angularfire2';
import { CoffeeService } from '../coffees/coffee.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-coffee-edit',
  templateUrl: './coffee-edit.component.html',
  styleUrls: ['./coffee-edit.component.css']
})
export class CoffeeEditComponent implements OnInit {

  coffeeForm: FormGroup;
  private subscription: Subscription;
  private coffee: Coffee;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private af: AngularFire,
              private coffeeService: CoffeeService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    // Load coffee from firebase
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('id')) {
          this.coffeeService.loadCoffee(params['id']).subscribe(
            coffee => {
              this.coffee = coffee;
              this.initForm();
            }
          );
        }
    });
  }

  private initForm() {
    this.coffeeForm = this.formBuilder.group({
      name: [this.coffee.name, Validators.required],
      imagePath: [this.coffee.url, Validators.required],
      price: [this.coffee.price, Validators.required]
    });
  }

  onSubmit() {
    console.log('submit');
  }

}
