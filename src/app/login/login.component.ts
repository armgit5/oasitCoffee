import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from './login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  newAccount:boolean = true;
  loginForm: FormGroup;

  @Output() 
  customerNameOutput = new EventEmitter<string>();

  constructor(private loginService: LoginService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initLoginForm();
  }

  private initLoginForm() {
    let email = '';
    let password = '';

    this.loginForm = this.formBuilder.group({
      email: [email, Validators.required],
      password: [password, Validators.required]
    });
  }

   loginAsGuest(name) {
        this.customerNameOutput.emit(name);
    }

    toggleLogin() {
        if (this.newAccount == true) {
            this.newAccount = false;
        } else {
            this.newAccount = true;
        }
    }

    register() {
        
    }

    facebookLogin() {
       this.loginService.facebookLogin();
    }

    login() {
        console.log("login");
        console.log(this.loginForm.value);
        let email = this.loginForm.value.email;
        let password = this.loginForm.value.password;
        this.loginService.login(email, password);
    }

    // logout() {
    //     this.loginService.logout();
    // }

}
