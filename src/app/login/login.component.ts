import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from './login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { apiMethods } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  newAccount:boolean = false;
  newCompany: boolean = false;
  loginForm: FormGroup;
  registerForm: FormGroup;
  posted = false;

  @Output()
  customerNameOutput = new EventEmitter<string>();

  @Output()
  modalOff = new EventEmitter<boolean>();

  constructor(private loginService: LoginService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initLoginForm();
    this.initRegisterForm();
  }

  private initLoginForm() {
    let email = '';
    let password = '';

    this.loginForm = this.formBuilder.group({
      email: [email, Validators.required],
      password: [password, Validators.required]
    });
  }

  private initRegisterForm() {
    let companyName = '';
    let email = '';
    let password = '';
    let confirm = '';

    this.registerForm = this.formBuilder.group({
      companyName: [companyName, Validators.required],
      email: [email, Validators.required],
      password: [password, Validators.required],
      confirm: [confirm, Validators.required]
    });
  }

   loginAsGuest(name) {
        this.customerNameOutput.emit(name);
    }

    toggleLogin(newCompany: boolean) {
        this.registerForm.reset();
        this.posted = false;
        if (this.newAccount == true) {
            this.newAccount = false;
        } else {
            this.newAccount = true;
        }
        this.newCompany = newCompany;
    }

    register(role: string) {
      if (apiMethods.v1 || apiMethods.vCompanies) {
        console.log(this.registerForm.value);
        let email = this.registerForm.value.email;
        let password = this.registerForm.value.password;
        let companyName = this.registerForm.value.companyName;
        this.loginService.register(email, password, companyName, role);
        this.posted = false;
      }

      if (apiMethods.vWuth) {
        let email = this.registerForm.value.email;
        let password = this.registerForm.value.password;
        let companyName = this.registerForm.value.companyName;
        this.loginService.register(email, password, companyName, role);
        this.posted = false;
      }

    }

    facebookLogin() {
       this.loginService.facebookLogin()
        .then(authState => {
            this.modalOff.emit(true);
          })
          .catch(error => console.log(error));
    }

    login() {
      if (apiMethods.v1 || apiMethods.vCompanies) {
        let email = this.loginForm.value.email;
        let password = this.loginForm.value.password;
        this.loginService.login(email, password)
          .then(authState => {
            this.modalOff.emit(true);
          })
          .catch(error => console.log(error));
      }

      if (apiMethods.vWuth) {
        let email = this.loginForm.value.email;
        let password = this.loginForm.value.password;
        this.loginService.login(email, password)
          .then(authState => {
            this.modalOff.emit(true);
          })
          .catch(error => console.log(error));
      }

    }

    logout() {
        this.loginService.logout();
    }

}
