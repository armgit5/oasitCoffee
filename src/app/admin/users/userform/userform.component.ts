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
  selectedValue: string = null;

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
    let role = '';

    this.userForm = this.formBuilder.group({
      username: [username, Validators.required],
      email: [email, Validators.required],
      password: [password, Validators.required],
      confirm: [confirm, Validators.required],
      role: [role]
    });
  }

  createUser() {
      console.log(this.userForm.value, this.selectedValue);
  }

}
