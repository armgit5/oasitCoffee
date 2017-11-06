import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { User } from '../users';

@Component({
  selector: 'userform',
  templateUrl: './userform.component.html',
  styleUrls: ['../../admin.component.css',
                '../../animate.min.css',
                '../../demo.css',
                '../../light-bootstrap-dashboard.css',
                './userform.component.css']
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UsersService) {
    this.initRegisterForm();
  }

  ngOnInit() {
  }

  private initRegisterForm() {
    let username = 'armTest';
    let email = 'ysuwansiri2@yahoo.com';
    let password = '123456';
    let confirm = '123456';
    let role = 'Manager';

    this.userForm = this.formBuilder.group({
      username: [username, Validators.required],
      email: [email, Validators.required],
      password: [password, Validators.required],
      confirm: [confirm, Validators.required],
      role: [role, Validators.required]
    });
  }

  createUser() {
      console.log(this.userForm.value);
      let username = this.userForm.value.username;
      let email = this.userForm.value.email;
      let password = this.userForm.value.password;
      let role = this.userForm.value.role;
      this.userService.createUser(username, email, password, role);
  }



}
