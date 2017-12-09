import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from './login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  newAccount = false;
  newCompany = false;
  loginForm: FormGroup;
  registerForm: FormGroup;
  posted = false;

  spinning = false;
  errStatus = false;

  @Output()
  customerNameOutput = new EventEmitter<string>();

  @Output()
  modalOff = new EventEmitter<boolean>();

  constructor(private loginService: LoginService,
              private formBuilder: FormBuilder,
              private db: AngularFireDatabase,
              private router: Router) { }

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

    register() {
        console.log(this.registerForm.value);
        let email = this.registerForm.value.email;
        let password = this.registerForm.value.password;
        let companyName = this.registerForm.value.companyName;
        this.loginService.register(email, password, companyName);
        this.posted = false;

    }

    facebookLogin() {
       this.loginService.facebookLogin()
        .then(authState => {
            this.modalOff.emit(true);
          })
          .catch(error => console.log(error));
    }

    login() {
      this.spinning = true;

      let email = this.loginForm.value.email;
      let password = this.loginForm.value.password;
      this.loginService.login(email, password)
        .then(authState => {
            this.errStatus = false;
            this.spinning = false;
            this.loginService.loginStatusOutput.emit(email);
            this.modalOff.emit(true);
            this.router.navigate(['/']);
          }
        )
        .catch(err => {
          this.errStatus = true;
          this.spinning = false;
        });


    }

    logout() {
        this.loginService.logout();
        this.loginService.user = null;
    }

}
