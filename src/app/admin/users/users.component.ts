import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['../admin.component.css',
                '../animate.min.css',
                '../demo.css',
                '../light-bootstrap-dashboard.css']
})
export class UsersComponent implements OnInit {

  registerForm: FormGroup;
  
  constructor() { }

  ngOnInit() {
  }

}
