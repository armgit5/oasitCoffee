import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UsersService } from './users.service';

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

  constructor(private userService: UsersService) { }

  ngOnInit() {
  }

  createUser() {

  }

  deleteUser(id: number) {

  }

  loadAllUsers() {
    this.userService.loadAllUsers();
  }

}
