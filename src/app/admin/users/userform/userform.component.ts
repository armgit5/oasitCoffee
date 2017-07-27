import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {
    this.initRegisterForm();
  }

  ngOnInit() {
  }

  private initRegisterForm() {
    let username = '';
    let email = '';
    let password = '';
    let confirm = '';

    this.userForm = this.formBuilder.group({
      username: [username, Validators.required],
      email: [email, Validators.required],
      password: [password, Validators.required],
      confirm: [confirm, Validators.required]
    });
  }

  // createUser() {

  // }

}
